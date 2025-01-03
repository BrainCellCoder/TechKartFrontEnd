import React from "react";
import "./PopularCategory.css";
import tvPic from "./Cattv.jpg";
import cameraPic from "./Catcamera.png";
import gamingPic from "./Catgaming.png";
import landlinePic from "./Catlandline.png";
import radioPic from "./Catradio.png";
import speakerPic from "./Catspeaker.png";
// import { makeStyles } from "@material-ui/styles";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
// import { color } from "@chakra-ui/react";

// const useStyles = makeStyles((theme) => ({
//   scrollContainer: {
//     width: "400px", // Set the desired width for the scroll container
//     overflowX: "scrol", // Enable horizontal scrolling
//     padding: theme.spacing(2),
//     display: "flex",
//     justifyContent: "space-around",
//     textAlign: "center",
//   },
// }));

export const PopularCategory = () => {
  // const classes = useStyles();
  return (
    <>
      {/* <h3 className="popular-category-heading">Popular Categories</h3> */}
      <div>
        <div
          id="popular-category"
          // className={{
          //   width: "400px", // Set the desired width for the scroll container
          //   overflowX: "scrol", // Enable horizontal scrolling
          //   padding: 2,
          //   display: "flex",
          //   justifyContent: "space-around",
          //   textAlign: "center",
          //   display: "flex",
          //   justifyContent: "space-around",
          //   flexWrap: "wrap",
          // }}
        >
          {/* Content to be scrolled */}
          <div>
            <Link style={{ textDecoration: "none", color: "brown" }} to="/tv">
              <div
                className="popular-category-image"
                style={{ backgroundImage: `url(${tvPic})` }}
              ></div>
              <div className="popular-category-name">Televisions</div>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "brown" }}
              to="/camera"
            >
              <div className="popular-category-image">
                <img src={cameraPic} alt="img" />
              </div>
              <div className="popular-category-name">Cameras</div>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "brown" }}
              to="/gaming"
            >
              <div className="popular-category-image">
                <img src={gamingPic} alt="img" />
              </div>
              <div className="popular-category-name">Gamings</div>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "brown" }}
              to="/landline"
            >
              <div className="popular-category-image">
                <img src={landlinePic} alt="img" />
              </div>
              <div className="popular-category-name">Landlines</div>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "brown" }}
              to="/radio"
            >
              <div className="popular-category-image">
                <img src={radioPic} alt="img" />
              </div>
              <div className="popular-category-name">Radios</div>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "brown" }}
              to="/speaker"
            >
              <div className="popular-category-image">
                <img src={speakerPic} alt="img" />
              </div>
              <div className="popular-category-name">Speakers</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
