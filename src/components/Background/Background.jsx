const Background = ({ children }) => {
  return (
    <div className="md:bg-[url('/svg/banana.svg'),url('/svg/strawberry.svg'),url('/svg/green.svg')] md:bg-[62%,32%,80%]  bg-no-repeat  md:bg-[position:right_bottom,right_center,right_top] bg-contain min-h-screen xl:bg-[url('/svg/fruitss.svg')] bg-right">
      {children}
    </div>
  );
};

export default Background;
