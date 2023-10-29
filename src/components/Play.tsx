import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { devices } from './constants';

const MainFrame = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	align-items: center;
	justify-content: center;
`;

const Paragraph = styled.p`
	text-align: justify;
`;

const PlayButton = styled.button`
	width: 100%;
	height: 60px;
	margin-top: 50px;
	@media only screen and ${devices.md} {
		width: 20%;
		height: 50px;
	}
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
				<h1>Miłej zabawy!</h1>
			</Paragraph>

			<PlayButton className='button-play btn btn-warning' onClick={() => navigate('/game')}>
				ZAGRAJ
			</PlayButton>
		</MainFrame>
	);
}

export default CategoryChoice;
