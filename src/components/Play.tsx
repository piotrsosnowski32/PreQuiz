import styled from "styled-components";
import MainMenu from "./MainMenu";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  { CatID: 1, CatName: "Biologia", path: "/biology" },
  { CatID: 2, CatName: "Chemia", path: "/chemistry" },
  { CatID: 3, CatName: "Geografia", path: "/geography" },
];

const questions = [];

const MainFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CategoryFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
`;

const CategoryButton = styled.button`
  margin: 5px;
  width: 250px;
  height: 30%;
  padding: 0px;
`;

function CategoryChoice() {
  const navigate = useNavigate();

  return (
    <MainFrame>
      <h1>Wybierz kategorię</h1>
      <CategoryFrame>
        {categories.map(({ CatID, CatName }) => (
          <CategoryButton
            type="button"
            className="btn btn-warning"
            key={CatID}
            onClick={() => {
              navigate("/gameboard", { state: { CatID } });
            }}
          >
            {CatName}
          </CategoryButton>
        ))}
      </CategoryFrame>
    </MainFrame>
  );
}

export default CategoryChoice;
