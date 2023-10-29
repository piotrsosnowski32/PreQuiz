import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { devices } from './constants';

const MainFrame = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media only screen and ${devices.md} {
		width: 50%;
	} 
`;

const Paragraph = styled.p`
	text-align: justify;
`;

const PlayButton = styled.button`
	width: 90%;
	height: 50px;
	position: fixed;
	bottom: 16px;
`;

function CategoryChoice() {
	const navigate = useNavigate();

	return (
		<MainFrame>
			<Paragraph>
				<h1>Zasadowa przypominajka</h1>
				Dzienny Quiz składa się z 5 pytań. Na każde pytanie będziecie mieć 10 sekund.
				Do wyboru zawsze są 4 odpowiedzi, tylko jedna jest prawidłowa.
				Za każdą dobrą odpowiedź dostajecie 20pkt, za złą - -10pkt, można nie udzielać odpowiedzi,
				wtedy nie otrzymacie ani nie stracicie punktów.
				<p style={{ textAlign: 'right', marginTop: 32, fontSize: 24 }}>Miłej zabawy!</p>
			</Paragraph>

			<PlayButton className='button-play btn btn-warning' onClick={() => navigate('/game')}>
				Zagraj
			</PlayButton>
		</MainFrame>
	);
}

export default CategoryChoice;
