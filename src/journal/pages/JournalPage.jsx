
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';



export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>

      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias provident molestias aperiam vel cum sit illo amet ipsam quae delectus voluptas, impedit mollitia. Neque modi laboriosam voluptatum repudiandae eveniet assumenda!
      </Typography> */}

      {
        (!!active) 
          ? (<NoteView />)
          : ( <NothingSelectedView /> )
      }

      {/* <NothingSelectedView /> */}
      {/* <NoteView /> */}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>

    </JournalLayout>
  )
}
