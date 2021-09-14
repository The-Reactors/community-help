import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const RightCard = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [proximity, setProximity] = useState(15)

  const [filterData, setFilterData] = useState({
    category: "none",
    priority: "none",
    status: "none"
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFilterData({ ...filterData, [name]: value });
  };
  const selectProximityHandler = (e) => {
    setFilterData((prev) => {
      return {
        ...prev,
        proximity: e.target.value
      };
    });
  };
  const selectCategoryHandler = (e) => {
    setFilterData((prev) => {
      return {
        ...prev,
        category: e.target.value
      };
    });
  };
  const selectPriorityHandler = (e) => {
    setFilterData((prev) => {
      return {
        ...prev,
        priority: e.target.value
      };
    });
  };
  const selectStatusHandler = (e) => {
    setFilterData((prev) => {
      return {
        ...prev,
        status: e.target.value
      };
    });
  };

  const handleProximityChange = (e,newValue) => {
    setProximity(newValue)
  }

  const fileSubmitHandler = (e) => {
    e.preventDefault();

    props.updateFilterParams({
      proximity: proximity,
      category: filterData.category,
      priority: filterData.priority,
      status: filterData.status
    });

    props.updateFilter();
  };


  return (
    <div>
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textDark" align="center" gutterBottom variant="h4">
          Filters
        </Typography>
        <br/>
        <br/>
        <Typography htmlFor="proximity" variant = "h5" component="h2" align="center">
          Based on Proximity
        </Typography>
        
        <Slider
          defaultValue={15}
          // getAriaValueText={valuetext}
          // onChange = {(e) => selectProximityHandler(e)}
          value = {proximity}
          aria-labelledby="discrete-slider-small-steps"
          step={5}
          onChange = {handleProximityChange}
          marks 
          min={15}
          max={50}
          valueLabelDisplay="auto"
        />
        <br />
       <hr />
       <br /> 
        <Typography htmlFor="category" variant = "h5" component="h2" align="center">
          Based on Category
        </Typography>
        <br/>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Category</InputLabel>
          <Select
            native
            onChange={(e) => selectCategoryHandler(e)}
            inputProps={{
              name: "age",
              id: "filled-age-native-simple"
            }}
            align="center"
          >
            <option aria-label="None" value="" />
            <option value="land issue" name="category">
              Land Issue
            </option>
            <option value="water issue" name="category">
              Water Issue
            </option>
            <option value="public health" name="category">
              Public Health
            </option>
            <option value="sanitation" name="category">
              Sanitation
            </option>
            <option value="pollution" name="category">
              Pollution
            </option>
            <option value="healthcare issue" name="category">
              Healthcare Issue
            </option>
            <option value="electricity" name="category">
              Electricity
            </option>
            <option value="road blockage" name="category">
              Road Blockage
            </option>
            <option value="waste management" name="category">
              Waste Management
            </option>
          </Select>
          
        </FormControl>
        <br/>
        <hr></hr>
        <br />
        <Typography htmlFor="priority" variant = "h5" component="h2" align="center">
          Based on Priority
        </Typography>
        <br/>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Priority</InputLabel>
          <Select
            native
            onChange={(e) => selectPriorityHandler(e)}
            inputProps={{
              name: "age",
              id: "filled-age-native-simple"
            }}
            align="center"
          >
            <option aria-label="None" value="" />
            <option value="emergency" name="priority">
              Emergency
            </option>
            <option value="urgent" name="priority">
              Urgent
            </option>
            <option value="not urgent" name="priority">
              Not Urgent
            </option>
          </Select>
          <br />
        </FormControl>
        <br />
        <hr></hr>
        <br />
        <Typography htmlFor="status" variant = "h5" component="h2" align="center">
          Based on Status
        </Typography>
        <br />
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Status</InputLabel>
          <Select
            native
            onChange={(e) => selectStatusHandler(e)}
            inputProps={{
              name: "age",
              id: "filled-age-native-simple"
            }}
            align="center"
          >
            <option aria-label="None" value="" />
            <option value="Solved" name="status">
              Ticket Solved{" "}
            </option>
            <option value="pending" name="status">
              Ticket Pending
            </option>
          </Select>
          <br />
        </FormControl>
      </CardContent>
      <CardActions align = "center">
        <Box alignItems = "center">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={fileSubmitHandler}
          >
            Apply Filters
          </Button>
        </Box>
      </CardActions>
    </Card>
    </div>
  );
}

export default RightCard