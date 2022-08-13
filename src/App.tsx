import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components';
import ImageList from '@mui/material/ImageList';
import { ImageListItem, Pagination, Modal, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Speed from './components/Speed';


const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [pageNumbers, setPageNumbers] = useState(0)
  const [selectedImage, setSelectedImage] = useState(undefined)

  
  useEffect(()=> {
    const getPhotos = async () => {
        SetLoading(true);
        let p = await Photos.getAll()
        setPhotos(p);
        setPageNumbers(Math.ceil(p.length/12))
        setDisplayPhotos(p.slice((12 * selectedPage) - 12, 12 * selectedPage))
        SetLoading(false);
    }
    getPhotos();
  }, []);

  useEffect(() => { setDisplayPhotos(photos.slice((12 * selectedPage) - 12, 12 * selectedPage)) }, [selectedImage, selectedPage, photos])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;


    if(file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if(result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  const onPageChange = (e: any, page: number) => {
    console.log(page)
    setSelectedPage(page)
  }

  const onModalClose = (e: any) => {
    setSelectedImage(undefined)
  }

  const selectImage = (url: any) => {
    setSelectedImage(url)
  }
  return (

    <C.Container>
      <Navbar />

      <C.Area>
       <C.Header>Galeria de Fotos</C.Header>

    {
      <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
        <input type="file" name="image" />
        <input type="submit" value="Enviar" />


      </C.UploadForm>
    }

    { loading &&
      <C.ScreenWarning>
        <div className="emoji">🤪</div>
        <div>Loading...</div>
      </C.ScreenWarning>
     }

    {!loading && photos.length > 0 &&
    <>
      <ImageList cols={4} rowHeight={210} >
        {displayPhotos.map((item, index)=>(
          <ImageListItem key={index} onClick={() => selectImage(item.url)}>
            <PhotoItem  url={item.url} name={item.name} />

          </ImageListItem>
          ))}
      </ImageList>

    </>
}
      <Pagination onChange={onPageChange} count={pageNumbers} color="secondary"/>
{!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😞</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        }
<Speed />
<Breadcrumbs />
         </C.Area>
    
        <Modal open={selectedImage != undefined} onClose={onModalClose}>
          <Box onClick={(e) => {onModalClose(e)}} style={{textAlign: "center", marginLeft: "10%", marginRight: "10%"}}><img src={selectedImage}></img></Box>
        </Modal>
    
      </C.Container>
    
  );
}

export default App;
