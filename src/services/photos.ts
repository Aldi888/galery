import { Photo } from "../types/Photo";
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 as createId } from 'uuid';
import axios from "axios";
//import Resizer from "react-image-file-resizer";

const backend_url = 'https://dev.webops.com.br/'
const FormData = require('form-data')

export const getAll = async () => {
    let list: Photo[] = [];

    const photoNames = await axios.get(backend_url + 'listFiles')
    console.log(photoNames.data)
    photoNames.data.forEach((f : any) => {
        list.push({
            name: f,
            url: backend_url + 'uploads/' + f

        });
    });
    //const imagesFolder = ref(storage, 'images' );
    //const photoList = await listAll (imagesFolder) ;

    /*for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);


        list.push({
            name: photoList.items[i].name,
            url: photoUrl

        });

    }*/

    return list;
}

export const insert = async (file: File) => {
    const formData = new FormData()
    if(['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/heic'].includes(file.type)) {
        console.log(file.size)
        if ((file.size/1024 / 1024) > 2048) return new Error('Tamanho nao permitido, limite 2mb');
        ;
        formData.append('file', file)
        
        var res = await axios.post(backend_url + 'upload', formData)
       
        return {name: res.data.filename, url: backend_url + 'uploads/' + res.data.filename} as Photo
        //return { name: upload.ref.name, url: photoUrl } as Photo;
    } else {
        return new Error('Tipo de arquivo não permitido.');
    }
}

export const deletePhoto = async (name: string) => {
    let photoRef = ref(storage, `images/${name}`);
    await deleteObject(photoRef);
}