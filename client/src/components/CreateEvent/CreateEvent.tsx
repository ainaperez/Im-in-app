import { useState, useContext, useEffect } from "react";
import InputComponent from "../UI/inputs/InputComponent";
import { Button, Form  } from "antd";
import Context from "../context/context";
import SelectInputComponent from "../UI/inputs/SelectInputComponent";
import ModalComponent from "../UI/ModalComponent";
import SwitchInputComponent from "../UI/inputs/SwitchInputComponent";
import NumberInputComponent from "../UI/inputs/NumberInputComponent";
import './CreateEvent.css'
import * as EventService from "../../services/event_service";
import { sendPictureToCloud } from "../../services/cloudinary_service";
import TextareaInputComponent from "../UI/inputs/TextareaInputComponent";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import MapComponent from "../UI/MapComponent";
import { formatEvents } from "../../helpers/formatting_functions";
import CreateEventModalHeader from './CreateEventModalHeader';

type Option = {
  label: string;
  value: string;
}

interface CloudinaryResponse {
  public_id: string;
  version: number;
  format: string;
  created_at: string;
}

const CreateEvent = (props) => {

  const {activeUser, users, setEvents, events} = useContext(Context);

  const [isLoading, setisLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<string[] | null>(null);
  const [limitAttendees, setLimitAttendees] = useState<string | null>(null);
  const [visibility, setVisibility] = useState(true);
  const [invitees, setInvitees] = useState<string[]>([]);
  const [hideFrom, sethideFrom] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [displayOptions, setDisplayOptions] = useState<Option[]>([]);

  const [formIsValid, setFormIsValid] = useState(false)

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const input = e.target.name;
    if(input === 'title') setTitle(e.target.value)
    if(input === 'description') setDescription(e.target.value)
    if(input === 'date') setDate(e.target.value)
    if(input === 'limitAttendees') setLimitAttendees(e.target.value)
  }

  function handleSwitch(){ setVisibility(!visibility) }

  // function handleHideFromSelect(e: React.ChangeEvent<HTMLInputElement>) {
  //   const newValue = e.target.value;
  //   sethideFrom(prevHideFrom => [...prevHideFrom, newValue])
  //  }
   function handleHideFromSelect(e: React.ChangeEvent<HTMLInputElement>) {sethideFrom([e.target.value])}

  // function handleInviteesSelect(e: React.ChangeEvent<HTMLInputElement>) {
  //   const newValue = e.target;
  //   setInvitees(preInvitee => [...preInvitee, newValue])
  //  }

  function handleInviteesSelect(e: React.ChangeEvent<HTMLInputElement>) {setInvitees([e.target.value])}
  function handleMapSelect(newCoordinates: string[]) {setCoordinates(newCoordinates)}

  async function photoUpload (file: File){
    const formData = new FormData();
    formData.append("my_file", file);
    // formData.append('upload_preset', 'jy1wbdka');
    await sendPictureToCloud(formData)
    .then((data: CloudinaryResponse)  => {
      return data.public_id;
    })
  }

  const handleLocationSelect = (e: string) => {
    console.log(e)
    setLocation(e);
    geocodeByAddress(e)
    .then((results: any) => getLatLng(results[0]))
    .then((latLng: any) => {
        console.log(latLng)
        setCoordinates([latLng.lat, latLng.lng]);
    }
    )
    .catch((error: Error) => console.error('Error', error));
  };

  function handleStep (method: boolean) {
    if(method) { setStep(step+1) }
    else { setStep(step-1) }
  }

  function displayUserOptions () {
    let temp: Option[] = []
    users?.forEach(option => {
      temp.push({
        "label": option.username,
        "value": option._id
      })})
    setDisplayOptions(temp);
  }

  const handleFormSubmit = async() => {
    //There may be problems when uploading the phots to cloudinary.
    // the addEvent function may not wait for the photo to be uploaded
    if(imageSelected){
      const public_id = await photoUpload(imageSelected);
      console.log(public_id)
    }


    // const newEvent = {
    //   owner: activeUser._id,
    //   title: title,
    //   description: description,
    //   date: date,
    //   location: location,
    //   coordinates: coordinates,
    //   image: imageSelected.name ,
    //   limitAttendees: limitAttendees,
    //   visibility: visibility,
    //   invitees: invitees,
    //   hideFrom: hideFrom
    // };

    // EventService.addEvent(newEvent).then(()=> {
    //   const newEvents = [...events, {owner: activeUser._id,
    //     title: title,
    //     description: description,
    //     date: new Date( Date.parse(date)),
    //     location: location,
    //     coordinates: coordinates,
    //     image: imageSelected.name ,
    //     limitAttendees: limitAttendees,
    //     visibility: visibility,
    //     invitees: invitees,
    //     hideFrom: hideFrom,
    //     joined: [],
    //     liked: false
    //   }]
    //   setEvents(formatEvents(activeUser, newEvents))
    //   props.close()
    // })
  }

  useEffect(() => {
    if(users){
      displayUserOptions()
    }
  }, [users])

  useEffect(() => {
    setisLoading(false)
  }, [displayOptions])

  return (

    <ModalComponent
    title="Create new Event"
    open={props.open}
    close={props.close}
    >
      <CreateEventModalHeader step={step} handleStep={handleStep} />

       <div className="modal-form-wrapper">
      {!isLoading && <>
        {step === 0 &&
          <>
          <Form
        name="create-event-first"
        onFinish={() => handleStep(true)}
        >
        <Form.Item
        name="title"
        label="Title"
        >
          <InputComponent
          id="title"
          name="title"
          type="text"
          autoComplete="title"
          required={true}
          maxLength={220}
          minLength={4}
          placeholder="max 220 characters"
          onchange={handleInputChange}
          value={title}
          />
        </Form.Item>

        <Form.Item name="description" label="Description">

        <TextareaInputComponent
            id="description"
            name="description"
            // type="textarea"
            autoSize={{ minRows: 2, maxRows: 6 }}
            required={props.required}
            placeholder={props.placeholder}
            onchange={handleInputChange}
            disabled={false}
            maxLength={2000}
            value={description}
        />
        </Form.Item>

        <Form.Item name="date" label="Time"
         >
          <InputComponent
          id="date"
          name="date"
          type="datetime-local"
          autoComplete="date"
          required={true}
          placeholder="max 220 characters"
          onchange={handleInputChange}
          value={date}/>
        </Form.Item>

        <Form.Item name="location" label="Location">
          <PlacesAutocomplete
              className='autocomplete-input'
              value={location}
              onChange={(e) => setLocation(e)}
              onSelect={handleLocationSelect}
              required

              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                  <input
                  {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                  })}

                  />
                  <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                      const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                      <div
                          {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                          })}
                      >
                          <span>{suggestion.description}</span>
                      </div>
                      );
                  })}
                  </div>
              </div>
              )}
          </PlacesAutocomplete>
        </Form.Item>
        {coordinates && <MapComponent initialValue={coordinates ? coordinates : null} handleSelect={handleMapSelect}/>}
        </Form>
        </>
        }
        </>
}


        {step === 1 && <>
        <Form
        name="create-event-second"
        onFinish={() => handleStep(true)}>
        <Form.Item name="limitAttendees" label="Limit Attendees">
          <NumberInputComponent
          id="limitAttendees"
          name="limitAttendees"
          autoComplete="limitAttendees"
          required={false}
          placeholder="no limit"
          onchange={(e: React.ChangeEvent<HTMLInputElement>): void =>{console.log(e);setLimitAttendees(e.target.value)}}
          />
        </Form.Item>

        <Form.Item name="visibility" label="Visibility">
          <SwitchInputComponent
           id="visibility"
          //  name="visibility"
           onchange={handleSwitch}
          />
        </Form.Item>

        {!visibility &&
          <Form.Item name="invitees" label="">
          <SelectInputComponent
           id="invitees"
           type="select"
           name="invitees"
           placeholder="select members"
           onchange={handleInviteesSelect}
           options={displayOptions}
           />
        </Form.Item>}


        <Form.Item name="hideFrom" label="Hide From">
        <SelectInputComponent
           id="hideFrom"
           type="select"
           name="hideFrom"
           placeholder="select members"
           onchange={handleHideFromSelect}
          options={displayOptions}
           />
        </Form.Item>
        </Form>
        </>
        }

        {step === 2 &&
        <>
        <Form
         name="create-event"
         onFinish={handleFormSubmit}>
        <p className="preview-title">Preview</p>
        <div className="preview-details">
        <div className='event-details'>
          <p>{activeUser && activeUser.username}</p>
          <h2 className='title'>{title}</h2>
          <p>{location}</p>
          <p>{date}</p>
        </div>
        <div className="image-display">
        <Form.Item name="image" label="Event Image">
            <input
                accept="image/*"
                id="photo-event-upload"
                type="file"
                onChange={(e) => {
                  setImageSelected(e.target.files?.[0] ?? null)
                  setTempImageUrl(e.target.files?.[0]? URL.createObjectURL(e.target.files[0]) : null)
                }}/>
        </Form.Item>
        {tempImageUrl && <img className="preview-image" src={tempImageUrl} alt="tempImage" />}
        </div>
        {/* <Image
         cloudName="dyjtzcm9r"
         publicId={`https://res.cloudinary.com/dyjtzcm9r/image/upload/v1682328789/${imageSelected.name}`} /> */}
        </div>
        </Form>
        </>
       }
      </div>

      </ModalComponent>
  )
}

export default CreateEvent;