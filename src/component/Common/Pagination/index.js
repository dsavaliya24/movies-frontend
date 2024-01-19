import "./Pagination.scss";
import RightArrow from "../../../assets/icons/arrow-right.svg";
import LeftArrow from "../../../assets/icons/arrow-left.svg";

export function Pagination(props) {
  const { pages = 1, current = 1, onClick } = props;

  const onPrev = () => onClick && onClick(current - 1);
  const onNext = () => onClick && onClick(current + 1);
  const onPrevDash = () => onClick && onClick(current - 2);
  const onNextDash = () => onClick && onClick(current + 2);
  const onFirst = () => onClick && onClick(1);
  const onLast = () => onClick && onClick(pages);

  return (
    <div className="pagination">
      {current !== 1 && (
        <button onClick={onPrev} className="prev">
          <img src={LeftArrow} alt="LeftArrow" />
        </button>
      ) }
      {current !== 1 && <button onClick={onFirst}>1</button>}
      {current > 3 && <button onClick={onPrevDash}>...</button>}
      {current - 1 > 1 && <button onClick={onPrev}>{current - 1}</button>}
      <button className="current">{current}</button>
      {pages!==0 && current + 1 < pages && <button onClick={onNext}>{current + 1}</button>}
      {pages!==0 && current <= pages - 3 && <button onClick={onNextDash}>...</button>}
      {pages!==0 && current !== pages && <button onClick={onLast}>{pages}</button>}
      {pages!==0 && current !== pages && (
        <button onClick={onNext} className="next">
          <img src={RightArrow} alt="RightArrow" />
        </button>
      ) }
    </div>
  );
}
