import styles from './Search.module.scss';
import searchIcon from '../../assets/search-icon.svg';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: FC = () => {
   const dispatch = useDispatch();
   const [value, setValue] = useState<string>('');
   const updateSearchValue = useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str));
      }, 450),
      [],
   );

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
   };
   return (
      <div className={styles.root}>
         <img className={styles.searchIcon} src={searchIcon} alt="" />
         <input
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            type="text"
            placeholder="Pizza search..."
         />
      </div>
   );
};

export default Search;
