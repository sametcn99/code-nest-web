import JSZip from 'jszip'

/**
 * Downloads the contents associated with the given content ID.
 * @param id - The ID of the content to download.
 * @returns A promise that resolves to a boolean indicating whether the download was successful.
 */
export async function downloadContents(files: FileTypes[]): Promise<boolean> {
	try {
		if (files.length === 0) throw new Error('No files found in the content')
		return files.length === 1
			? downloadSingleFile(files[0])
			: downloadMultipleFilesAsZip(files)
	} catch (error) {
		console.error('An error occurred:', error)
		return false
	}
}

/**
 * Downloads a single file.
 *
 * @param file - The file to be downloaded.
 * @returns A promise that resolves to a boolean indicating whether the download was successful.
 */
async function downloadSingleFile(file: FileTypes): Promise<boolean> {
	const url = URL.createObjectURL(new Blob([file.value]))
	downloadFile(url, file.filename)
	return true
}

/**
 * Downloads multiple files as a zip archive.
 * @param files - An array of FileTypes objects representing the files to be included in the zip archive.
 * @returns A Promise that resolves to a boolean indicating whether the download was successful.
 */
async function downloadMultipleFilesAsZip(
	files: FileTypes[]
): Promise<boolean> {
	const zip = new JSZip()
	files.forEach((file) => {
		zip.file(file.filename, file.value)
	})

	const content = await zip.generateAsync({ type: 'blob' })
	const zipName = `codenest_project_${new Date().toISOString().slice(0, 10)}.zip`
	const url = URL.createObjectURL(content)
	downloadFile(url, zipName)
	return true
}

/**
 * Downloads a file from the specified URL with the given filename.
 *
 * @param url - The URL of the file to download.
 * @param filename - The name to be used for the downloaded file.
 */
function downloadFile(url: string, filename: string) {
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}
