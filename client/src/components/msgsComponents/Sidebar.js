import React from 'react';
import DiscutionCard from './DiscutionCard';
import Loading from '../Spinner/Loading';
import { useSelector } from 'react-redux';

const Sidebar = ({ onClick }) => {
  const { conversations, loading, error } = useSelector(
    (state) => state.conversationReducer,
  );
  return (
    <div className='sidebar'>
      <div className='sidebar-header '>
        <h5>Messages</h5>
      </div>
      <div className='sidebar-disc'>
        {loading ? (
          <Loading />
        ) : (
          conversations?.map(
            (cnv) =>
              cnv.lastMessage && (
                <DiscutionCard key={cnv._id} onClick={onClick} cnv={cnv} />
              ),
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
