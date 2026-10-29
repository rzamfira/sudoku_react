import './GameControls.css';
import UndoIcon from '../../icons/undo.svg';
import EraseIcon from '../../icons/erase.svg';
import NotesIcon from '../../icons/notes.svg';

export default function GameControls({ updateCell, notesMode, toggleNotesMode, onUndo, handleClick }) {

  return (
    <div className="game-controls">
      <button className="game-controls-button" id="undo-button" onClick={() => handleClick(onUndo)}><img src={UndoIcon} alt="Undo" /></button>
      <button className="game-controls-button" id="erase-button" onClick={() => handleClick(() => updateCell('.'))}><img src={EraseIcon} alt="Erase" /></button>
      <button className={`game-controls-button ${notesMode ? 'notes-active' : ''}`} id="notes-button" onClick={() => handleClick(toggleNotesMode)}><img src={NotesIcon} alt="Notes" /></button>
    </div>
  );
  
}