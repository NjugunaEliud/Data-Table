import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
export default function Product() {
    const columns =[
        {
            name:"Sr. No",
            selector:(row)=>row.id
        },
        {
            name:"Title",
            selector:(row)=>row.title
        },
        {
            name:"Category",
            selector:(row)=>row.category
        },
        {
            name:"Price",
            selector:(row)=>row.price
        },
        {
            name:"Image",
            selector:(row)=><img  height={70} width={80} src={row.image}/>
        },
        {
            name:"Action",
            cell:(row)=>(
           <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', marginTop: '10px', border: 'none'  }} onClick={()=>handleDelete(row.id)}>Delete</button>
                
            )
        }
    ];
    const [data ,setData]= useState([]);
    const [filter , setFilter]= useState([]);
    const [search ,setSearch] = useState("");

    const getProduct =async ()=>{
        try{
            const req = await fetch('https://fakestoreapi.com/products');
            const res = await req.json();
            setData(res);
            setFilter(res);

        }
        catch(error){
         console.log(error)
        }
    }
    useEffect(()=>{
        getProduct()
    },[]);

    useEffect(()=>{
        const result =data.filter((item)=>{
            return item.title.toLowerCase().match(search.toLocaleLowerCase());
        })
        setFilter(result)
    },[search])

    const handleDelete=(val)=>{
        const newdata = data.filter((item)=>item.id!=val)
        setFilter(newdata)
    }

    const tableHeaderStyle ={
        headCells:{
            style:{
          backgroundColor: '#ccc',
        //   color: 'white',
          fontWeight: 'bold',
          fontSize:'14px'
            }
        }
    }
  return (
    <>
    <div>Product list</div>
    <DataTable 
    customStyles={tableHeaderStyle}
    columns={columns}
    data={filter}
    pagination
    // selectableRows
    fixedHeader
    selectableRowsHighlight
    highlightOnHover
    actions={
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', marginTop: '10px', border: 'none'  }}>Export PDF</button>
    }
    subHeader
        subHeaderComponent ={
            <input
            type='text'
            placeholder='Search ...'
            style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginTop: '10px'
              }}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
        }
    
    />
    </>
  )
}
