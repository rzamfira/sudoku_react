import './GameControls.css';
import UndoIcon from '../../icons/undo.svg';
import EraseIcon from '../../icons/erase.svg';
import NotesIcon from '../../icons/notes.svg';

export default function GameControls({ updateCell, notesMode, toggleNotesMode }) {

  return (
    <div className="game-controls">
      <button className={`game-controls-button ${notesMode ? 'notes-active' : ''}`} id="notes-button" onClick={toggleNotesMode}><img src={NotesIcon} alt="Notes" /></button>
      <button className="game-controls-button" id="erase-button" onClick={() => updateCell('.')}><img src={EraseIcon} alt="Erase" /></button>
      <button className="game-controls-button" id="undo-button" ><img src={UndoIcon} alt="Undo" /></button>
    </div>
  );
  
}