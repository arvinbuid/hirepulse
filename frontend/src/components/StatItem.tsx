import Wrapper from "../assets/wrappers/StatItem";

interface StatItemProps {
  color: string;
  bcg: string;
  icon: React.ReactNode;
  title: string;
  count: number;
}

const StatItem = ({color, bcg, icon, title, count}: StatItemProps) => {
  return (
    <Wrapper $color={color} $bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
