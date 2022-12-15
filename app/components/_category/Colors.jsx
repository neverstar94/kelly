import {
  FilterTitle,
  FilterViewMore,
  Color,
  Size,
  Collection
} from "core/theme/styles/catetory.styled";
import {
  Container,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Grid,
} from "node_modules/@material-ui/core/index";
import Slider from '@mui/material/Slider';
import React, { useEffect,useState} from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { baseURL } from "core/constants/index";
import Button from '@mui/material/Button';
function ProductFilters() {

  const router = useRouter();
  const [collections, set_collections] = useState([])
  const [sizes, set_sizes] = useState([])
  const [colors, set_colors] = useState([])
   const currency = useSelector((state) => state.master.currency);
   const [value, setValue] = React.useState([0, 100]);
   const [color, setColor] = React.useState('');
   const [size, setSize] = React.useState('');
   const [collection, setCollection] = React.useState(0);
   //////////
   const[colorview,setColorview]=React.useState('none');
   const[colortext,setColortext]=React.useState('+ View more');
   const[sizeview,setSizeview]=React.useState('none');
   const[sizetext,setSizetext]=React.useState('+ View more');
   const[collectionview,setCollectionview]=React.useState('none');
   const[collectiontext,setCollectiontext]=React.useState('+ View more');


   const handleChange = (event, newValue) => {//price select function
        setValue(newValue);
        let price_max=newValue[1]*100;
        let price_min=newValue[0]*100;
        const {page,per_page, color, page_type, size,category_id ,sub_category_id,collection} = router.query
        let pathname = router.pathname;
      
        let url = `${pathname}?page=${page}&per_page=${per_page}${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}&price_min=${price_min}&price_max=${price_max}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`;

        router.push(url);
    };
    const getData = async () => {

      const res = await fetch(
        `${baseURL}/products`
      );
      let response = await res.json();
      set_colors([...response.data.colors])
      set_sizes([...response.data.sizes])
      set_collections([...response.data.collections])
  } 

    useEffect(() => {
      getData();
      
    }, [router])
  const filterByColor = (color) => {
        setColor(color);
        const {page,per_page, collection, page_type, size,category_id ,sub_category_id,price_min,price_max} = router.query
        let pathname = router.pathname;
      
        let url = `${pathname}?page=1&per_page=2${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${price_min?`&price_min=${price_min}`:''}${price_max?`&price_max=${price_max}`:''}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`;
        
        router.push(url); 
  };
    
  const filterBySize = (size) => {
      setSize(size.target.value);
      const {page,per_page, collection,color, page_type, category_id ,sub_category_id,price_min,price_max} = router.query
      let pathname = router.pathname;
    
      let url = `${pathname}?page=${page}&per_page=${per_page}${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${price_min?`&price_min=${price_min}`:''}${price_max?`&price_max=${price_max}`:''}${color?`&color=${color}`:''}${size?`&size=${size.target.value}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`;
      router.push(url);
  };

  const filterByCollection = (collection) => {
      setCollection(eval(collection.target.value));
      const {page,per_page, color, page_type, size,category_id ,sub_category_id,price_min,price_max} = router.query
      let pathname = router.pathname;
    
      let url = `${pathname}?page=${page}&per_page=${per_page}${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${price_min?`&price_min=${price_min}`:''}${price_max?`&price_max=${price_max}`:''}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection.target.value}`:''}${currency?`&currency=${currency.code}`:''}`;
      router.push(url);
  };
  const clearstate=()=>{
   
     setColor('');
     setCollection(0);
     setSize('sizetemp');
     setValue([0,100]);
      const {page,per_page,page_type,category_id ,sub_category_id} = router.query
      let pathname = router.pathname;
    
      let url = `${pathname}?page=${page}&per_page=${per_page}${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${currency?`&currency=${currency.code}`:''}`;
      router.push(url);
  }
  ///////////////////////////
  const colormoretext=()=>{
    if(colortext=='+ View more'){
      setColorview('block');
      setColortext(' Less');
    }else{
      setColorview('none');
      setColortext('+ View more');
    }
  }
  const sizemoretext=()=>{
    if(sizetext=='+ View more'){
      setSizeview('block');
      setSizetext(' Less');
    }else{
      setSizeview('none');
      setSizetext('+ View more');
    }
  }
  const collectionmoretext=()=>{
    if(collectiontext=='+ View more'){
      setCollectionview('block');
      setCollectiontext(' Less');
    }else{
      setCollectionview('none');
      setCollectiontext('+ View more');
    }
  }
  return (
    <>
      <Container>
         <Grid container spacing={0} style={{padding:'5px 55px 5px 10px',width:'100%'}}>
           <Button variant="outlined"  style={{border:'1px solid',borderRadius:'0px',color:'black',width:'100%'}} onClick={()=>clearstate()}>Clear All</Button>
        </Grid>
        <FilterTitle>Color</FilterTitle>
        <Grid container spacing={0}>
          {colors.map(({ name, code },index) => (
           index<10?
            <Grid item md={6} key={code}>
              
              <div onClick={() => filterByColor(name)}>
                <a>
                  <Color>
                    <div
                      style={{
                        background: code,
                      }}
                    ></div>
                    <p style={{fontSize:'14px'}}>{name}</p>
                  </Color>
                 </a>
               </div>
             </Grid>:
             <>
              <Grid item md={6} key={code} style={{display:colorview}}>
                <div onClick={() => filterByColor(name)}>
                  <a>
                    <Color>
                      <div
                        style={{
                          background: code,
                        }}
                      ></div>
                      <p style={{fontSize:'14px'}}>{name}</p>
                    </Color>
                  </a>
                </div>
              </Grid>
             </>
           ))}
        </Grid>
        {
          colors.length>10?<FilterViewMore onClick={()=>colormoretext()}>{colortext}</FilterViewMore>:(null)
        }
        
      </Container>

      <Container style={{paddingTop:'10px'}}>
        <FilterTitle>Size</FilterTitle>

        <FormGroup name="size">
          <Size>
            <Grid container spacing={0}>
                <RadioGroup
                  name="size"  value={size}
                  onChange={filterBySize}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
              {sizes.map(({ name, id },index) => (
                index<10?
                <Grid item md={6} key={id} style={{marginBottom:'-15px'}}>
                  <FormControlLabel
                    value={name}
                    control={<Radio />}
                    label={name}
                    style={{fontSize:'12px'}}
                  />
                </Grid>:
                <Grid item md={6} key={id} style={{marginBottom:'-15px'}}>
                 <FormControlLabel
                  value={name}
                  control={<Radio />}
                  label={name}
                  style={{fontSize:'12px',display:sizeview}}
                 />
                </Grid>
              ))}
                  <Grid item md={6} style={{display:'none'}}>
                  <FormControlLabel
                    value='sizetemp'
                    control={<Radio />}
                    style={{fontSize:'12px'}}
                  />
                </Grid>
              </RadioGroup>
            </Grid>
          </Size>
        </FormGroup>
        {
          sizes.length>10?<FilterViewMore onClick={()=>sizemoretext()}>{sizetext}</FilterViewMore>:(null)
        }
       
      </Container>

      <Container style={{paddingTop:'10px'}}>
        <FilterTitle>Collections</FilterTitle>
        <FormGroup name='collection'>
          <Collection>
                 <RadioGroup
                  name="collection"  value={collection}
                  onChange={filterByCollection}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {collections.map(({ title ,id},index) => (
                    index<10?
                    <Grid container  key={id} style={{marginBottom:'-15px'}} >
                        <FormControlLabel
                          value={id}
                          control={<Radio />}
                          label={title}
                          style={{fontSize:'12px'}}
                        />
                    </Grid>:
                    <Grid container  key={id} style={{marginBottom:'-15px'}} >
                      <FormControlLabel
                        value={id}
                        control={<Radio />}
                        label={title}
                        style={{fontSize:'12px',display:collectionview}}
                      />
                     </Grid>
                   ))}
                  <FormControlLabel
                      value={0}
                      control={<Radio />}
                      style={{fontSize:'12px',display:'none'}}
                    />
               </RadioGroup>
          </Collection>
            </FormGroup>
            {
                collections.length>10?<FilterViewMore onClick={()=>collectionmoretext()}>{collectiontext}</FilterViewMore>:(null)
            }
      </Container>
      <Container style={{paddingTop:'10px'}}>
        {
          currency===null?<FilterTitle>Price Range (LKR)</FilterTitle>:<FilterTitle>Price Range ({currency.code})</FilterTitle>
        }
        
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          style={{width:'78%',color:'#282323'}}
         // valueLabelDisplay="auto"
        />
        <div>
           <div style={{float:'left',marginLeft:'-5px',fontSize:'14px',color:'grey'}}>0</div>
           {
            currency===null?<div style={{marginLeft:'74%',fontSize:'14px',color:'grey'}}>10000</div>:<div style={{marginLeft:'74%',fontSize:'15px',color:'grey'}}>{parseFloat(10000*currency.rate)}</div>
           }
           
        </div>
      </Container>
    </>
  );
}

export default ProductFilters;
