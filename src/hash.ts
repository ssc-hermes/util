import { blake3 } from '@noble/hashes/blake3'
import { toString } from 'uint8arrays/to-string'

export function blake (file:string|Uint8Array) {
    const hash = blake3(file)
    const slugifiedHash = toString(hash, 'base64url')
    return slugifiedHash
}

/**
 * Create a blake3 hash from a given file
 * @param file {File} A file object as from the browser
 * @returns {Promise<string>} The blake hash
 */
export function getHashFile (file:File):Promise<string> {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.addEventListener('error', (err) => {
            reject(err)
        })

        reader.onloadend = () => {
            const res = reader.result as ArrayBuffer
            if (!res) return reject(new Error('No content'))
            resolve(getHash(new Uint8Array(res)))
        }

        reader.readAsArrayBuffer(file)
    })
}

export function getHash (arr:Uint8Array):string {
    return blake(arr)
}

export default {
    blake,
    getHashFile,
    getHash
}
