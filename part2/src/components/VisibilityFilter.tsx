import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/notes/noteSlice";
import { RootState } from "../app/store";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state:RootState)=> state.notes.filter);

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        checked={filter === 'ALL'}
        onChange={() => dispatch(setFilter({ filter: "ALL" }))}
      />
      important
      <input
        type="radio"
        name="filter"
        checked={filter === 'IMPORTANT'}
        onChange={() => dispatch(setFilter({ filter: "IMPORTANT" }))}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        checked={filter === 'NONIMPORTANT'}
        onChange={() => dispatch(setFilter({ filter: "NONIMPORTANT" }))}
      />
    </div>
  );
};

export default VisibilityFilter;
