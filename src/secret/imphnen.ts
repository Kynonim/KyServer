import { writeFileSync, readFileSync, existsSync } from "fs"

const databasePath = process.env.POSTINGAN_PATH ?? ""

/**
 * buat atau perbarui postingan
 * @param data 
 */

const updateDatabase = async (data: any) => {
    let database = await BacaDataDariDatabase() ?? []
    database = Array.isArray(database) ? database : [database]
    const user = database.rikyxdz.findIndex((user: any) => user.email === data.email)
    if (!user) {
        const update = {
            rikyxdz: {
                nama: data.nama,
                email: data.email,
                konten: {
                    judul: data.judul,
                    konten: data.konten,
                    tanggal: new Date().toLocaleDateString()
                }
            }
        }
        database.push(update)
        writeFileSync(databasePath, database)
    }
}

/**
 * baca postingan dari database
 * @returns data json/object
 */

async function BacaDataDariDatabase() {
    if (!existsSync(databasePath)) {
        const dbs = {
            Author: "Riky Ripaldo",
            Dibuat: new Date().toLocaleDateString()
        }
        writeFileSync(databasePath, JSON.stringify(dbs))
        return null
    } else {
        const database = readFileSync(databasePath, "utf8")
        return JSON.parse(database)
    }
}

/**
 * membuat postingan
 * @param data 
 * @returns boolean/object(string)
 */

export async function BuatPostingan(data: any): Promise<{ status: boolean; message: string }> {
    if (!data.nama || !data.email || !data.judul || !data.konten) {
        return { status: false, message: "Data tidak lengkap" }
    } else {
        await updateDatabase(data)
        return { status: true, message: "Berhasil membuat postingan" }
    }
}

/**
 * membaca postingan
 * @param data 
 * @returns boolean/object(string)
 */

export async function BacaPostingan(data: any): Promise<{ status: boolean; message: string; data: any }> {
    if (!data.email) {
        return { status: false, message: "Data tidak lengkap", data: null }
    } else {
        const database = await BacaDataDariDatabase()
        const user = database.rikyxdz.find((user: any) => user.email === data.email)
        if (!user) {
            return { status: false, message: "Email tidak ditemukan", data: null }
        } else {
            return { status: true, message: "Berhasil membaca postingan", data: user.konten }
        }
    }
}