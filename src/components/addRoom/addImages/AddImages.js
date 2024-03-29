import {Paper} from '@mui/material'
import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ImagesList from './ImagesList'
import ProgressList from './progressList/ProgressList'

const AddImages = () => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
    console.log('accepted files are: ', acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {'image/*': []},
  })

  console.log('files are: ', files)

  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          backgroundColor: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': {border: '1px solid #ccc'},
        }}
      >
        <div style={{padding: '16px'}} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{color: 'green'}}>Drop your file here</p>
          ) : (
            <p>Drag and Drop or click here to select file</p>
          )}
          <em>Images with .jpeg, .png, .jpg extension are accepted</em>
        </div>
      </Paper>
      <ProgressList {...{files}} />
      <ImagesList />
    </>
  )
}

export default AddImages
