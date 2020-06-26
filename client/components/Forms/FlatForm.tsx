import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import {
  FormButton,
  FormContainer,
  FormInput,
  FormInputLabelRequired,
  FullRow,
  FormSelect,
  FormSuccessMessage, HalfRow, FormInputError, FormInputLabel, ThirdRow, PricePerMeter, ButtonListItemForm, FormTextarea
} from './StyledForm'
import Spinner from '../Spinner/Spinner'
import { useForm } from "react-hook-form"
import Dropzone from './Dropzone'
import ExternalImageUpload from './ExternalImageUpload'
import { ButtonList } from './StyledFlatFilter'
import { Heading3UnderlineColor } from '../StyledHeadings'
import { Flat } from '../../../Types/Flat'
import machineReadableDate from '../../utils/machineReadableDate'

interface Props {
  buttonText: string
  onSubmit: Function
  authContext: any
  successMessage?: string
  flat?: Flat
}

const FlatForm = ({ buttonText, onSubmit, authContext, successMessage, flat }: Props) => {
  const [inputValues, setInputValues] = useState({
    address: undefined,
    city: 'Select a city...',
    neighbourhood: 'Select a neighbourhood...',
    priceCZK: 0,
    squareMeters: 0,
    link: undefined,
    agency: undefined,
    rooms: undefined,
    floor: undefined,
    contact: undefined,
    visited: undefined,
    lift: undefined,
    parking: undefined,
    balcony: undefined,
    reasonForSelling: undefined,
    ownershipStructure: undefined,
    houseOwnershipStructure: undefined,
    lastSale: undefined,
    ownershipType: undefined,
    monthlyExpensesAssociation: undefined,
    monthlyExpensesOther: undefined,
    renovated: undefined,
    houseRenovated: undefined,
    garden: undefined,
    heating: undefined,
    publicTransport: undefined,
    mortgaged: undefined,
    cadastralInfo: undefined,
    notes: undefined
  })
  const [mainImage, setMainImage] = useState<string>()
  const [citiesLoading, setCitiesLoading] = useState(true)
  const [cities, setCities] = useState([])
  const [neighbourhoodsLoading, setNeighbourhoodsLoading] = useState(false)
  const [neighbourhoods, setNeighbourhoods] = useState([])
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur'
  })

  useEffect(() => {
    if (flat) {
      setInputValues({
        ...inputValues,
        address: flat.address || undefined,
        city: flat.city._id || undefined,
        neighbourhood: flat.neighbourhood._id || undefined,
        priceCZK: flat.priceCZK || 0,
        squareMeters: flat.squareMeters || 0,
        link: flat.link || undefined,
        agency: flat.agency || undefined,
        rooms: flat.rooms || undefined,
        floor: flat.floor || undefined,
        contact: flat.contact || undefined,
        visited: machineReadableDate(flat.visited) || undefined,
        lift: flat.lift || undefined,
        parking: flat.parking || undefined,
        balcony: flat.balcony || undefined,
        reasonForSelling: flat.reasonForSelling || undefined,
        ownershipStructure: flat.ownershipStructure || undefined,
        houseOwnershipStructure: flat.houseOwnershipStructure || undefined,
        lastSale: machineReadableDate(flat.lastSale) || undefined,
        ownershipType: flat.ownershipType || undefined,
        monthlyExpensesAssociation: flat.monthlyExpensesAssociation || undefined,
        monthlyExpensesOther: flat.monthlyExpensesOther || undefined,
        renovated: machineReadableDate(flat.renovated) || undefined,
        houseRenovated: machineReadableDate(flat.houseRenovated) || undefined,
        garden: flat.garden || undefined,
        heating: flat.heating || undefined,
        publicTransport: flat.publicTransport || undefined,
        mortgaged: flat.mortgaged || undefined,
        cadastralInfo: flat.cadastralInfo || undefined,
        notes: flat.notes || undefined
      })
      setMainImage(flat.mainImage)
    }
  }, [])

  const fetchCities = async () => {
    const fetchedCities = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities`)
    setCities(fetchedCities.data)
    setCitiesLoading(false)
  }

  const fetchNeighbourhoods = async () => {
    setNeighbourhoodsLoading(true)
    setInputValues({
      ...inputValues,
      neighbourhood: flat?.neighbourhood?._id || 'Select a neighbourhood...'
    })
    const fetchedNeighbourhoods = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/neighbourhoods/byCity/${inputValues.city}`)
    setNeighbourhoods(fetchedNeighbourhoods.data)
    setNeighbourhoodsLoading(false)
  }

  useEffect(() => {
    if (inputValues.city !== 'Select a city...') {
      fetchNeighbourhoods()
    } else {
      setNeighbourhoodsLoading(false)
    }
  }, [inputValues.city])

  useEffect(() => {
    fetchCities()
  }, [])

  const onChange = (e: ChangeEvent<any>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = (path: string) => {
    setMainImage(path)
  }

  const onSubmitForm = () => {
    if (authContext.user) {
      onSubmit({
        ...inputValues,
        addedBy: authContext.user._id,
        mainImage
      })
    } else {
      onSubmit({
        ...inputValues,
        mainImage
      })
    }
  }

  if (citiesLoading) {
    return (
      <Spinner/>
    )
  }

  if (cities) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <FormContainer>
          <Heading3UnderlineColor>Main info</Heading3UnderlineColor>
          <HalfRow>
            <FormInputLabelRequired>Address</FormInputLabelRequired>
            <FormInput
              type='text'
              id='address'
              name='address'
              placeholder={'e.g. Seifertova 11'}
              value={inputValues.address}
              onChange={onChange}
              ref={register({
                validate: {
                  filled: () => inputValues.address.length > 2
                }
              })}
            />
            {errors.address && <FormInputError>Address must be at least 3 characters long</FormInputError>}
          </HalfRow>
          <HalfRow>
            <FormInputLabelRequired>City</FormInputLabelRequired>
            <FormSelect
              name='city'
              id='city'
              value={inputValues.city}
              onChange={onChange}
              ref={register({ validate: {
                  selected: () => inputValues.city !== 'Select a city...'
              }
              })}
            >
              <option value={'Select a city...'} disabled>Select a city...</option>
              {
                cities.map((city) => <option value={city._id} key={city._id}>{city.name}</option>)
              }
            </FormSelect>
            {errors.city && <FormInputError>Please select a city</FormInputError>}
          </HalfRow>
          {neighbourhoodsLoading && <FullRow><Spinner/></FullRow>}
          {
            !neighbourhoodsLoading && neighbourhoods.length > 0 &&
            <FullRow>
              <FormInputLabelRequired>Neighbourhood</FormInputLabelRequired>
              <FormSelect
                name='neighbourhood'
                id='neighbourhood'
                value={inputValues.neighbourhood}
                onChange={onChange}
                ref={register({ validate: {
                    selected: () => inputValues.neighbourhood !== 'Select a neighbourhood...'
                  }
                })}
              >
                <option value={'Select a neighbourhood...'} disabled>Select a neighbourhood...</option>
                {
                  neighbourhoods.map((neighbourhood) => <option value={neighbourhood._id} key={neighbourhood._id}>{neighbourhood.name}</option>)
                }
              </FormSelect>
              {errors.neighbourhood && <FormInputError>Please select a neighbourhood</FormInputError>}
            </FullRow>
          }
          <FullRow>
            <FormInputLabel>Image</FormInputLabel>
            <Dropzone
              activeDragText={'Drop the image here ...'}
              emptyZoneText={'Drag \'n\' drop an image here, or click to select an image'}
              multipleFiles={false}
              callback={handleImageUpload}
              imagePreview={mainImage}
            />
          </FullRow>
          <FullRow>
            <ExternalImageUpload callback={handleImageUpload}/>
          </FullRow>
          <HalfRow>
            <FormInputLabelRequired>Square meters</FormInputLabelRequired>
            <FormInput
              type='number'
              name='squareMeters'
              value={inputValues.squareMeters}
              onChange={onChange}
              ref={register({
                validate: {
                  filled: () => inputValues.squareMeters > 0
                }
              })}
            />
            {errors.squareMeters && <FormInputError>Enter square meters.</FormInputError>}
          </HalfRow>
          <Heading3UnderlineColor>Price</Heading3UnderlineColor>
          <HalfRow>
            <FormInputLabelRequired>Price in CZK</FormInputLabelRequired>
            <FormInput
              type='number'
              name='priceCZK'
              value={inputValues.priceCZK}
              onChange={onChange}
              ref={register({
                validate: {
                  filled: () => inputValues.priceCZK > 0
                }
              })}
            />
            {errors.priceCZK && <FormInputError>Enter a price.</FormInputError>}
          </HalfRow>
          <HalfRow>
            {
              inputValues.priceCZK > 0 && inputValues.squareMeters > 0 ?
              <PricePerMeter>{parseInt((inputValues.priceCZK / inputValues.squareMeters).toFixed(0)).toLocaleString()} CZK / m<sup>2</sup></PricePerMeter>
                : <PricePerMeter>Please enter square meters and price in CZK</PricePerMeter>
            }
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Reason for selling</FormInputLabel>
            <FormInput
              type='text'
              name='reasonForSelling'
              value={inputValues.reasonForSelling}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Last sale of the flat</FormInputLabel>
            <FormInput
              type='datetime-local'
              id='lastSale'
              name='lastSale'
              value={inputValues.lastSale}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Monthly expenses - Association (SVJ)</FormInputLabel>
            <FormInput
              type='number'
              name='monthlyExpensesAssociation'
              value={inputValues.monthlyExpensesAssociation}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Monthly expenses - other</FormInputLabel>
            <FormInput
              type='number'
              name='monthlyExpensesOther'
              value={inputValues.monthlyExpensesOther}
              onChange={onChange}
            />
          </HalfRow>
          <Heading3UnderlineColor>Flat info</Heading3UnderlineColor>
          <HalfRow>
            <FormInputLabel>Disposition</FormInputLabel>
            <FormSelect name='rooms' value={inputValues.rooms} onChange={onChange}>
              <option>Select disposition of the flat..</option>
              <option value='1+kk'>1+kk</option>
              <option value='1+1'>1+1</option>
              <option value='2+kk'>2+kk</option>
              <option value='2+1'>2+1</option>
              <option value='3+kk'>3+kk</option>
              <option value='3+1'>3+1</option>
              <option value='4+kk'>4+kk</option>
              <option value='4+1'>4+1</option>
              <option value='5+1'>5+1</option>
              <option value='Larger than 5 + 1'>Larger than 5+1</option>
            </FormSelect>
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Floor</FormInputLabel>
            <FormInput
              type='number'
              id='floor'
              name='floor'
              value={inputValues.floor}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Flat ownership structure</FormInputLabel>
            <FormInput
              type='text'
              name='ownershipStructure'
              value={inputValues.ownershipStructure}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>House ownership structure</FormInputLabel>
            <FormInput
              type='text'
              name='houseOwnershipStructure'
              value={inputValues.houseOwnershipStructure}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>OwnershipType</FormInputLabel>
            <FormSelect name='ownershipType' value={inputValues.ownershipType} onChange={onChange}>
              <option>Select ownership type..</option>
              <option value='personal'>personal (osobní)</option>
              <option value='cooperative'>cooperative (družstevní)</option>
            </FormSelect>
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Heating</FormInputLabel>
            <FormInput
              type='text'
              name='heating'
              value={inputValues.heating}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Flat renovated on</FormInputLabel>
            <FormInput
              type='datetime-local'
              id='renovated'
              name='renovated'
              value={inputValues.renovated}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>House renovated on</FormInputLabel>
            <FormInput
              type='datetime-local'
              id='houseRenovated'
              name='houseRenovated'
              value={inputValues.houseRenovated}
              onChange={onChange}
            />
          </HalfRow>
          <FullRow>
            <FormInputLabel>Public transport</FormInputLabel>
            <FormTextarea
              name='publicTransport'
              value={inputValues.publicTransport}
              onChange={onChange}
            />
          </FullRow>
          <ThirdRow>
            <FormInputLabel>Lift</FormInputLabel>
            <ButtonList>
              <ButtonListItemForm
                active={inputValues.lift}
                onClick={() => setInputValues({
                  ...inputValues,
                  lift: true
                })}>
                yes
              </ButtonListItemForm>
              <ButtonListItemForm
                active={!inputValues.lift && typeof inputValues.lift === 'boolean'}
                onClick={() => setInputValues({
                  ...inputValues,
                  lift: false
                })}>
                no
              </ButtonListItemForm>
              <ButtonListItemForm
                active={typeof inputValues.lift === 'undefined'}
                onClick={() => setInputValues({
                  ...inputValues,
                  lift: undefined
                })}>
                unknown
              </ButtonListItemForm>
            </ButtonList>
          </ThirdRow>
          <ThirdRow>
            <FormInputLabel>Parking</FormInputLabel>
            <ButtonList>
              <ButtonListItemForm
                active={inputValues.parking}
                onClick={() => setInputValues({
                  ...inputValues,
                  parking: true
                })}>
                yes
              </ButtonListItemForm>
              <ButtonListItemForm
                active={!inputValues.parking && typeof inputValues.parking === 'boolean'}
                onClick={() => setInputValues({
                  ...inputValues,
                  parking: false
                })}>
                no
              </ButtonListItemForm>
              <ButtonListItemForm
                active={typeof inputValues.parking === 'undefined'}
                onClick={() => setInputValues({
                  ...inputValues,
                  parking: undefined
                })}>
                unknown
              </ButtonListItemForm>
            </ButtonList>
          </ThirdRow>
          <ThirdRow>
            <FormInputLabel>Balcony</FormInputLabel>
            <ButtonList>
              <ButtonListItemForm
                active={inputValues.balcony}
                onClick={() => setInputValues({
                  ...inputValues,
                  balcony: true
                })}>
                yes
              </ButtonListItemForm>
              <ButtonListItemForm
                active={!inputValues.balcony && typeof inputValues.balcony === 'boolean'}
                onClick={() => setInputValues({
                  ...inputValues,
                  balcony: false
                })}>
                no
              </ButtonListItemForm>
              <ButtonListItemForm
                active={typeof inputValues.balcony === 'undefined'}
                onClick={() => setInputValues({
                  ...inputValues,
                  balcony: undefined
                })}>
                unknown
              </ButtonListItemForm>
            </ButtonList>
          </ThirdRow>
          <ThirdRow>
            <FormInputLabel>Garden</FormInputLabel>
            <ButtonList>
              <ButtonListItemForm
                active={inputValues.garden}
                onClick={() => setInputValues({
                  ...inputValues,
                  garden: true
                })}>
                yes
              </ButtonListItemForm>
              <ButtonListItemForm
                active={!inputValues.garden && typeof inputValues.garden === 'boolean'}
                onClick={() => setInputValues({
                  ...inputValues,
                  garden: false
                })}>
                no
              </ButtonListItemForm>
              <ButtonListItemForm
                active={typeof inputValues.garden === 'undefined'}
                onClick={() => setInputValues({
                  ...inputValues,
                  garden: undefined
                })}>
                unknown
              </ButtonListItemForm>
            </ButtonList>
          </ThirdRow>
          <ThirdRow>
            <FormInputLabel>Mortgage</FormInputLabel>
            <ButtonList>
              <ButtonListItemForm
                active={inputValues.mortgaged}
                onClick={() => setInputValues({
                  ...inputValues,
                  mortgaged: true
                })}>
                yes
              </ButtonListItemForm>
              <ButtonListItemForm
                active={!inputValues.mortgaged && typeof inputValues.mortgaged === 'boolean'}
                onClick={() => setInputValues({
                  ...inputValues,
                  mortgaged: false
                })}>
                no
              </ButtonListItemForm>
              <ButtonListItemForm
                active={typeof inputValues.mortgaged === 'undefined'}
                onClick={() => setInputValues({
                  ...inputValues,
                  mortgaged: undefined
                })}>
                unknown
              </ButtonListItemForm>
            </ButtonList>
          </ThirdRow>
          <Heading3UnderlineColor>Contact and additional info</Heading3UnderlineColor>
          <HalfRow>
            <FormInputLabel>Listing link</FormInputLabel>
            <FormInput
              type='text'
              id='link'
              name='link'
              value={inputValues.link}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Real Estate Agency</FormInputLabel>
            <FormInput
              type='text'
              id='agency'
              name='agency'
              value={inputValues.agency}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Agency/Seller contact</FormInputLabel>
            <FormInput
              type='text'
              id='contact'
              name='contact'
              value={inputValues.contact}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Cadastral info</FormInputLabel>
            <FormInput
              type='text'
              name='cadastralInfo'
              value={inputValues.cadastralInfo}
              onChange={onChange}
            />
          </HalfRow>
          <HalfRow>
            <FormInputLabel>Visited on</FormInputLabel>
            <FormInput
              type='datetime-local'
              id='visited'
              name='visited'
              value={inputValues.visited}
              onChange={onChange}
            />
          </HalfRow>
          <FullRow>
            <FormInputLabel>Additional notes</FormInputLabel>
            <FormTextarea
              name='notes'
              value={inputValues.notes}
              onChange={onChange}
            />
          </FullRow>
          <FormButton onClick={handleSubmit(onSubmitForm)}>{buttonText}</FormButton>
          {
            successMessage && <FormSuccessMessage>{successMessage}</FormSuccessMessage>
          }
        </FormContainer>
      </form>
    )
  }



}

export default FlatForm
