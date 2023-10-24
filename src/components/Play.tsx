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
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			</Paragraph>

			<PlayButton className='button-play btn btn-warning' onClick={() => navigate('/game')}>
				ZAGRAJ
			</PlayButton>
		</MainFrame>
	);
}

export default CategoryChoice;
