import React from 'react';
import pensil from '@/components/board/pensil.png';
import './styles.scss';

const EditPen = () => (
    <div className="edit control__edit">
    <img src={pensil} alt="edit"/>
    </div>
);

export default EditPen;