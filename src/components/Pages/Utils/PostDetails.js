import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styleUserPost } from "../../common/MuiModal";
import { useCollection } from "../../hooks/useCollection";
import "./Style.css";
import { BsFillPinMapFill } from "react-icons/bs";

const PostDetails = ({ handleOpen, handleClose, open }) => {
  const { documents } = useCollection("posts");
  const [selectedItem, setSelectedItem] = useState([]);
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  // console.log(
  //   documents.map((data) => {
  //     return console.log(data);
  //   })
  // );
  console.log(date);

  // console.log(time);
  const handleSelect = (selectedItem, desc, time, location) => {
    setSelectedItem(selectedItem);
    setDesc(desc);
    setTime(time?.toDate());
    setLocation(location);
    handleOpen();
    // setModalOpen(true);
  };
  useEffect(() => {
    const dayTime = new Date(time).getTime();
    const newDate = new Date(dayTime);
    setDate(newDate);
  }, [time]);
  return (
    <>
      {documents?.map((data, i) => (
        <div className="img-post" key={i}>
          <>
            <img
              src={data?.imgUrls}
              // key={data.uid}
              alt="post 1"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                boxShadow: " 0px 2px 8px 2px #ac6b70",
              }}
              onClick={() =>
                handleSelect(
                  data?.imgUrls,
                  data?.description,
                  data?.timeStamp,
                  data?.location
                )
              }
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleUserPost}>
                {data?.imgUrls && (
                  <div className="modal-image-container">
                    {/* <p>{new Date(time).getTime()}</p> */}
                    <h3>
                      <BsFillPinMapFill color="red"/>
                      {location}
                    </h3>
                    <p>
                      {date.getUTCDate() +
                        "/" +
                        (date?.getUTCMonth() + 1) +
                        "/" +
                        date?.getUTCFullYear()}
                    </p>
                    <img
                      src={selectedItem}
                      // key={data.uid}
                      alt="post 1"
                      onClick={handleOpen}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <p>{desc}</p>
                  </div>
                )}
              </Box>
            </Modal>
          </>
        </div>
      ))}
    </>
  );
};

export default PostDetails;
