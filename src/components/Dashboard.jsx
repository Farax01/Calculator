import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "../Dashboard.css";
import arrow from "../assets/turn-back-arrow-white.png";
import { Link } from "react-router-dom";
import home from "../assets/house-svgrepo-com.svg";
import history from "../assets/history-svgrepo-com-thinner.svg";
import capture from "../assets/Capture1.png";
import logo from "../assets/entypo--grid.png";
import hourglass from "../assets/ph--hourglass-high-light.png";
import employeePic from "../assets/clarity--employee-line.png";
import employeesPic from "../assets/clarity--employee-group-line.png";
import calendar from "../assets/radix-icons--calendar.png";

const Dashboard = () => {
  //variables used in calculation
  let calculation = 0;
  const [packagePrice, setPackagePrice] = useState(0);
  const [equipmentCost, setEquipmentCost] = useState(0);
  const [materialCost, setmaterialCost] = useState(0);
  const [regular, setRegular] = useState(0);
  const [special, setSpecial] = useState(0);
  const [workingDay, setworkingDay] = useState(0);
  const [workingHour, setworkingHour] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSelected, setisSelected] = useState(false);
  const [isDeepCleaning, setisDeepCleaning] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [isDiscount, setisDiscount] = useState(false);
  const [tileCost, settileCost] = useState(0);
  const [carpetCost, setcarpetCost] = useState(0);
  const [tileNumber, settileNumber] = useState(0);
  const [carpetNumber, setcarpetNumber] = useState(0);

  //prices displayed
  const [basePrice, setBasePrice] = useState(0);
  const [monthlyRate, setmonthlyRate] = useState(0);
  const [annualRate, setannualRate] = useState(0);
  const [savings, setsavings] = useState(0);

  const packageProfitMargins = {
    Budget: 0.5,
    Standard: 0.3,
    Premium: 0.35,
    Executive: 0.4,
  };

  const regularEmployee = 22;
  const specialEmployee = 25;

  //base price calculation
  useEffect(() => {
    let calculatedBasePrice = packagePrice;
    setBasePrice(calculatedBasePrice);

    calculatedBasePrice += equipmentCost;

    setBasePrice(calculatedBasePrice);
    //for additional employees

    let calc1 = regularEmployee * regular;
    let calc2 = specialEmployee * special;

    calculatedBasePrice += calc1 + calc2;

    setBasePrice(calculatedBasePrice);

    let newCalc = calculatedBasePrice * materialCost + calculatedBasePrice;
    setBasePrice(newCalc);

    if (isSelected) {
      const profitMargin = packageProfitMargins[selectedPackage] || 0;
      calculation = newCalc * (1 + profitMargin);
    } else {
      return undefined;
    }

    setBasePrice(calculation);
    //deep cleaning
    if (isDeepCleaning) {
      calculation *= 1.3;
    }
    setBasePrice(calculation);

    //for monthly price calculation
    let monthlyHours = workingHour * workingDay * 4;
    let payPerHour = monthlyHours * calculation;
    setmonthlyRate(payPerHour);
    let annualPay1 = payPerHour * 0.7;
    let annualPay2 = payPerHour * 11;
    let annualPay3 = payPerHour * 12;
    let annualPay = annualPay1 + annualPay2;
    setannualRate(annualPay);

    //savings = total monthly rate - first month discount + savings cost
    //tile and carpet
    let savingsCost = tileCost * tileNumber + carpetCost * carpetNumber;
    savingsCost += payPerHour - annualPay1;
    setsavings(savingsCost);

    //discount only affects the annual price, monthly and savings
    if (isDiscount) {
      console.log(discountValue);
      payPerHour *= discountValue;
      annualPay = payPerHour * 12;
      annualPay3 -= annualPay
      savingsCost = tileCost * tileNumber + carpetCost * carpetNumber;
      savingsCost += annualPay3
    }
    setmonthlyRate(payPerHour);
    setannualRate(annualPay);
    setsavings(savingsCost);
  }, [
    packagePrice,
    equipmentCost,
    materialCost,
    selectedPackage,
    regular,
    special,
    workingDay,
    workingHour,
    monthlyRate,
    tileNumber,
    carpetNumber,
    isDeepCleaning,
    isDiscount,
    discountValue,
  ]);

  return (
    <>
      <div className="dashboard">
        <div className="icons" id="icons">
          <Link to={"/home-page"}>
            <img className="arrow" src={home} alt="" />
            {/* <h3>Home</h3> */}
          </Link>
          <Link to={"/history-page"}>
            <img className="arrow" src={history} alt="" />
            {/* <h3>History</h3> */}
          </Link>
          <Link to={"/home-page"}>
            <img className="arrow" src={arrow} alt="" />
            {/* <h3>Log Out</h3> */}
          </Link>
        </div>

        <div className="content">
          <div className="head">
            <img src={logo} className="logo" alt="" />
            <p>Workforce cost calculator</p>
            <div
              class="hamburger"
              id="hamburger"
              onClick={() => {
                document.getElementById("icons").classList.toggle("active");
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <hr />

          <ul>
            <li>
              <p>1. Please select the package type</p>

              <div className="list">
                <div>
                  <input
                    type="radio"
                    name="package"
                    id="Budget"
                    value="28"
                    onClick={(e) => {
                      setPackagePrice(Number(e.target.value));
                      setSelectedPackage(e.target.id);
                    }}
                  />
                  Budget
                </div>
                <div>
                  <input
                    type="radio"
                    name="package"
                    id="Standard"
                    value="56"
                    onClick={(e) => {
                      setPackagePrice(Number(e.target.value));
                      setSelectedPackage(e.target.id);
                    }}
                  />
                  Standard
                </div>
                <div>
                  <input
                    type="radio"
                    name="package"
                    id="Premium"
                    value="73"
                    onClick={(e) => {
                      setPackagePrice(Number(e.target.value));
                      setSelectedPackage(e.target.id);
                    }}
                  />
                  Premium
                </div>
                <div>
                  <input
                    type="radio"
                    name="package"
                    id="Executive"
                    value="80"
                    onClick={(e) => {
                      setPackagePrice(Number(e.target.value));
                      setSelectedPackage(e.target.id);
                    }}
                  />
                  Executive
                </div>
              </div>
            </li>

            <li>
              <p>2. Please select the right equipment</p>

              <div className="list2">
                <div>
                  <input
                    type="radio"
                    name="equipment"
                    value="7"
                    onClick={(e) => {
                      setEquipmentCost(Number(e.target.value));
                    }}
                  />
                  Basic
                </div>
                <div>
                  <input
                    type="radio"
                    name="equipment"
                    value="12"
                    onClick={(e) => {
                      setEquipmentCost(Number(e.target.value));
                    }}
                  />
                  Robotic
                </div>
              </div>
            </li>
            <li>
              <p>3. Please select the right material</p>
              <div className="material-packages">
                <div>
                  <input
                    type="radio"
                    name="material-package"
                    id=""
                    value="0.12"
                    onClick={(e) => {
                      setmaterialCost(Number(e.target.value));
                      setisSelected(true);
                    }}
                  />
                  Basic Material
                </div>
                <div>
                  <input
                    type="radio"
                    name="material-package"
                    id=""
                    value=".15"
                    onClick={(e) => {
                      setmaterialCost(Number(e.target.value));
                      setisSelected(true);
                    }}
                  />
                  Eco Material
                </div>
                <div>
                  <input
                    type="radio"
                    name="material-package"
                    id=""
                    value=".2"
                    onClick={(e) => {
                      setmaterialCost(Number(e.target.value));
                      setisSelected(true);
                    }}
                  />
                  Premium Material
                </div>
              </div>
            </li>
            <li>
              <p>4. Please select additional services</p>
              <div className="material-packages">
                <div>
                  <input
                    type="radio"
                    name=""
                    id=""
                    value=""
                    onClick={(e) => {
                      setisDeepCleaning("true");
                    }}
                  />
                  Deep Cleaning
                </div>
                <div>
                  <input
                    type="radio"
                    name="discount"
                    id=""
                    value="0.95"
                    onClick={(e) => {
                      setisDiscount("true");
                      setDiscountValue(e.target.value);
                    }}
                  />
                  5% Discount
                </div>
                <div>
                  <input
                    type="radio"
                    name="discount"
                    id=""
                    value="0.9"
                    onClick={(e) => {
                      setisDiscount("true");
                      setDiscountValue(e.target.value);
                    }}
                  />
                  10% Discount
                </div>
                <div>
                  <input
                    type="radio"
                    name="discount"
                    id=""
                    value="0.85"
                    onClick={(e) => {
                      setisDiscount("true");
                      setDiscountValue(e.target.value);
                    }}
                  />
                  15% Discount
                </div>
              </div>
            </li>
            <li>
              <div className="last-list floor2">
                <div className="material-packages floor">
                  <div>
                    <input
                      type="radio"
                      name=""
                      id=""
                      value="carpet"
                      onClick={(e) => {
                        setcarpetCost(0.4);
                      }}
                    />
                    Carpet
                  </div>
                  <div>
                    <input
                      type="radio"
                      name=""
                      id=""
                      value="tile"
                      onClick={(e) => {
                        settileCost(0.5);
                      }}
                    />
                    Tile
                  </div>
                </div>
                <div className="additional">
                  <div>
                    <label htmlFor="">
                      <i>Input carpet sqft: </i>
                    </label>
                    <input
                      type="number"
                      name="sqft"
                      id=""
                      onChange={(e) => {
                        setcarpetNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="">
                      <i>Input tile sqft: </i>
                    </label>
                    <input
                      type="number"
                      name="sqft"
                      id=""
                      onChange={(e) => {
                        settileNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <hr />

          <div className="results">
            <div className="results-div">
              <p>Total hourly rates:</p>
              <h3>${basePrice.toFixed(2)}</h3>
            </div>
            <div className="results-div">
              <p>Total monthly rates:</p>
              <h3>${monthlyRate.toFixed(2)}</h3>
            </div>

            <div className="results-div">
              <p>Total annual rates:</p>
              <h3>${annualRate.toFixed(2)}</h3>
            </div>

            <div className="results-div">
              <p>Total savings:</p>
              <h3>${savings.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        <div className="employees">
          <div className="employee">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">
                <img className="logos" src={employeePic} alt="" />
                Number of Regular Employees
              </label>
              <input
                style={{ margin: "5px 10px" }}
                type="number"
                name=""
                id=""
                onChange={(e) => {
                  setRegular(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">
                <img className="logos" src={employeesPic} alt="" />
                Number of Special Employees
              </label>
              <input
                style={{ margin: "5px 10px" }}
                type="number"
                name=""
                id=""
                onChange={(e) => {
                  setSpecial(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="employee">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">
                <img className="logos" src={hourglass} alt="" />
                Number of Working Hours per Day
              </label>
              <input
                style={{ margin: "5px 10px" }}
                type="number"
                name=""
                id=""
                onChange={(e) => {
                  setworkingHour(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="">
                <img className="logos" src={calendar} alt="" />
                Number of Working Days per Week
              </label>
              <input
                style={{ margin: "5px 10px" }}
                type="number"
                name=""
                id=""
                onChange={(e) => {
                  setworkingDay(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
