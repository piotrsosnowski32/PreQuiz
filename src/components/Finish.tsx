import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { devices } from './constants';

const MainDiv = styled.div`
    margin-top: 100px;
    width: 100%
    align-items: center;

`;

const Info = styled.p`
	width: 100%;
	height: 100px;
	text-align: center;
	font-size: 25px;
	@media only screen and ${devices.md} {
		font-size: 50px;
	}
`;

const EndButton = styled.button`
	width: 150px;
	height: 50px;
`;

const ButtonDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MemikDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default function Finish() {
	const navigate = useNavigate();

	return (
		<MainDiv>
			<Info>Dzięki za dzisiaj!</Info>

			<MemikDiv>TU MEMIK NA DZIEŃ</MemikDiv>

			<ButtonDiv>
				<EndButton
					type='button'
					className='button-play btn btn-warning'
					onClick={() => navigate('/')}
				>
					KONIEC
				</EndButton>
			</ButtonDiv>
		</MainDiv>
	);
}
