import react from 'react';

const SubjectCardPreview = ({subject, onClick}) => {

    return (
        <div onClick={onClick} className=''>
            <p className=''>{subject.id}</p>
            <p className=''>{subject.first_name}</p>
            <p className=''>{subject.last_name}</p>
        </div>
    )
}

export default SubjectCardPreview;