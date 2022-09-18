import React from 'react'

type Props = {
    classname?: string,
    title: string,
    content: String,
    src: string,
    id: number
  }

const Card = ({title, content, src, id}: Props) => {
  return (
    <div className={`max-w-[500px] lg lg:mt-0 ${id!==1 ? 'mt-44': ''} bg-[#F7F7F7] text-center shadow-[0_4px_10px_2px_rgba(0,0,0,0.25)] p-4 basis-1/5  h-[22rem]`}>
        <div className='relative top-[-100px]'>
          <span className={`m-auto clip-image h-[250px]   w-[250px]  block bg-cover bg-center ${src} `}></span>
          <h3>{title}</h3>
          
          <p className="text-base ">{content}
          </p>
        </div>
    </div>
  )
}

export default Card