import { supabase } from './supabase'

/**
 * Delete a file from Supabase storage
 * @param {string} url - The full URL or path of the file to delete
 * @param {string} bucket - The storage bucket name ('images' or 'videos')
 * @returns {Promise<boolean>} - Returns true if deletion was successful
 */
export const deleteFromStorage = async (url, bucket = 'images') => {
    if (!url) return false
    
    // Skip if it's a local file (starts with /)
    if (url.startsWith('/')) {
        console.log('Skipping local file deletion:', url)
        return true
    }
    
    try {
        // Extract the file path from the URL
        // URL format: https://xxx.supabase.co/storage/v1/object/public/images/folder/filename.ext
        let filePath = url
        
        if (url.includes('supabase.co')) {
            const urlParts = url.split(`/storage/v1/object/public/${bucket}/`)
            if (urlParts.length > 1) {
                filePath = urlParts[1]
            }
        }
        
        console.log(`Deleting file from ${bucket}:`, filePath)
        
        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath])
        
        if (error) {
            console.error('Error deleting file:', error)
            return false
        }
        
        console.log('File deleted successfully')
        return true
    } catch (error) {
        console.error('Error in deleteFromStorage:', error)
        return false
    }
}

/**
 * Upload a file to Supabase storage
 * @param {File} file - The file to upload
 * @param {string} folder - The folder name within the bucket
 * @param {string} bucket - The storage bucket name ('images' or 'videos')
 * @returns {Promise<string|null>} - Returns the public URL or null if failed
 */
export const uploadToStorage = async (file, folder, bucket = 'images') => {
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${folder}/${fileName}`

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file)

        if (error) throw error

        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath)

        return urlData.publicUrl
    } catch (error) {
        console.error('Error uploading file:', error)
        return null
    }
}

/**
 * Replace a file in Supabase storage (delete old, upload new)
 * @param {File} newFile - The new file to upload
 * @param {string} oldUrl - The URL of the old file to delete
 * @param {string} folder - The folder name within the bucket
 * @param {string} bucket - The storage bucket name ('images' or 'videos')
 * @returns {Promise<string|null>} - Returns the new public URL or null if failed
 */
export const replaceInStorage = async (newFile, oldUrl, folder, bucket = 'images') => {
    // Delete old file first
    if (oldUrl) {
        await deleteFromStorage(oldUrl, bucket)
    }
    
    // Upload new file
    return await uploadToStorage(newFile, folder, bucket)
}
