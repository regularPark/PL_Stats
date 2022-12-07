import { useParams } from "react-router-dom";

const TeamPages = () => {
  let { id } = useParams();

  return (
    <>
      <p style={{ fontSize: "2.5em", color: "white", fontWeight: "bold" }}>
        {id}
      </p>
      <div className="board">
        <ul>
          <li>일정</li>
          <li>선수 정보</li>
          <li>응원</li>
        </ul>
      </div>
    </>
  );
};

export default TeamPages;
