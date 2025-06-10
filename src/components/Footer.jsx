import 'boxicons/css/boxicons.min.css';

const Footer = () => {
  return (
    <footer className='flex items-center justify-between lg:mt-[15%] mt-[25%] py-8 
    lg:px-8 md:px-16 px-8 border-t-[0.3px] border-[#babaff]'>
        <img className='h-10' src="public\images\illu-text.png" alt='Ill-text'></img>
  <img className='h-16 md:inline hidden' src="public/images/illu-logo.png" alt='Illu-logo'></img>
   
   <div className='flex gap-4'>
    <a className='md:text-3xl text-2xl hover:text-violet-600 duration-300 ' href='#'><i className='bx bxl-twitter'></i></a>
    <a className='md:text-3xl text-2xl hover:text-violet-600 duration-300 ' href='#'><i className='bx bxl-whatsapp'></i></a>
    <a className='md:text-3xl text-2xl hover:text-violet-600 duration-300 ' href='#'><i className='bx bxl-facebook'></i></a>
    <a className='md:text-3xl text-2xl hover:text-violet-600 duration-300 ' href='#'><i className='bx bxl-linkedin-square'></i></a>
   </div>
    </footer>
  )
}

export default Footer