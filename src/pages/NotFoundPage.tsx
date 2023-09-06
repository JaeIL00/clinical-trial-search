import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <span>잘못된 경로입니다</span>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
    </>
  );
};

export default NotFoundPage;
