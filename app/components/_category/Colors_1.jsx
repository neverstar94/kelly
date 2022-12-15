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
import { baseURL,localURL } from "core/constants/index";
import Button from '@mui/material/Button';
function ProductFilters_1({id}) {
  
  const router = useRouter();
  const [collections, set_collections] = useState([])
  const [sizes, set_sizes] = useState([])
  const [colors, set_colors] = useState([])
   const currency = useSelector((state) => state.master.currency);
   const [value, setValue] = React.useState([0, 100]);
   const [color, setColor] = React.useState('');
   const [size, setSize] = React.useState('');
   const [collection, setCollection] = React.useState(0);
   const handleChange = (event, newValue) => {//price select function
        setValue(newValue);
        let price_max=newValue[1]*100;
        let price_min=newValue[0]*100;
        const {page,per_page, color, page_type, size,category_id ,sub_category_id,collection} = router.query
        let pathname = router.pathname;
      
        let url = `/category/${id}?page=${page}&per_page=${per_page}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}&price_min=${price_min}&price_max=${price_max}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`;

        router.push(url);
    };
    const getData = async (id) => {
   
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
    const {page,per_page, collection, page_type, size,id ,sub_category_id,price_min,price_max} = router.query
  
    let url = `/category/${id}?page=1&per_page=2${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${price_min?`&price_min=${price_min}`:''}${price_max?`&price_max=${price_max}`:''}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`;
    
    router.push(url); 
  };
    
  const filterBySize = (size) => {
      setSize(size.target.value);
      const {page,per_page, collection,color, page_type, category_id ,sub_category_id,price_min,price_max} = router.query
      let pathname = router.pathname;
    
      let url = `/category/${id}?page=${page}&per_page=${per_page}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${price_min?`&price_min=${price_min}`:''}${price_max?`&price_max=${price_max}`:''}${color?`&color=${color}`:''}${size?`&size=${size.target.value}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`;
      router.push(url);
  };

  const filterByCollection = (collection) => {
      setCollection(eval(collection.target.value));
      const {page,per_page, color, page_type, size,category_id ,sub_category_id,price_min,price_max} = router.query
      let pathname = router.pathname;
    
      let url = `/category/${id}?page=${page}&per_page=${per_page}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${price_min?`&price_min=${price_min}`:''}${price_max?`&price_max=${price_max}`:''}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection.target.value}`:''}${currency?`&currency=${currency.code}`:''}`;
      router.push(url);
  };
  const clearstate=()=>{
   
     setColor('');
     setCollection(0);
     setSize('sizetemp');
     setValue([0,100]);
      const {page,per_page,page_type,category_id ,sub_category_id} = router.query
      let pathname = router.pathname;
    
      let url = `/category/${id}?page=${page}&per_page=${per_page}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:''}${currency?`&currency=${currency.code}`:''}`;
      router.push(url);
  }
  return (
    <>
      <Container>
         <Grid container spacing={0} style={{padding:'5px 55px 5px 10px',width:'100%'}}>
           <Button variant="outlined"  style={{border:'1px solid',borderRadius:'0px',color:'black',width:'100%'}} onClick={()=>clearstate()}>Clear All</Button>
        </Grid>
        <FilterTitle>Color</FilterTitle>
        <Grid container spacing={0}>
          {colors.map(({ name, code }) => (
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
            </Grid>
          ))}
        </Grid>
        <FilterViewMore>+ View more</FilterViewMore>
      </Container>

      <Container>
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
              {sizes.map(({ name, id }) => (
                <Grid item md={6} key={id} style={{marginBottom:'-15px'}}>
                  <FormControlLabel
                    value={name}
                    control={<Radio />}
                    label={name}
                    style={{fontSize:'12px'}}
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

        <FilterViewMore>+ View more</FilterViewMore>
      </Container>

      <Container>
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
                  {collections.map(({ title ,id}) => (
                    <Grid container  key={id} style={{marginBottom:'-15px'}} >
                        <FormControlLabel
                          value={id}
                          control={<Radio />}
                          label={title}
                          style={{fontSize:'12px'}}
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
        <FilterViewMore>+ View more</FilterViewMore>
      </Container>
      <Container>
        {
          currency===null?<FilterTitle>Price Range(LKR)</FilterTitle>:<FilterTitle>Price Range({currency.code})</FilterTitle>
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

export default ProductFilters_1;
