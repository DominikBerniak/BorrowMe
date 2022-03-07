import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
const CostTypesButtons = ({handleCostTypeClick, selectedType}) => {
    return (
        <div className="d-flex w-70 p-5 mx-auto justify-content-around">
            <div id="cost-type-money"
                 className={"d-flex flex-column w-30 px-3 py-2 add-announcement-cost-type-button align-items-center justify-content-center rounded cursor-pointer p-1 "
                     + (selectedType==="money" && "selected-cost-type")}
                onClick={()=>handleCostTypeClick("money")}
            >
                <div className="">Gotówka</div>
                <AttachMoneyOutlinedIcon sx={{fontSize: 70, color: "#646464"}}/>
            </div>
            <div id="cost-type-free"
                 className={"d-flex flex-column w-30 px-3 py-2 add-announcement-cost-type-button align-items-center justify-content-center rounded cursor-pointer p-1 "
                     + (selectedType==="free" && "selected-cost-type")}
                 onClick={()=>handleCostTypeClick("free")}
            >
                <div className="">Za darmo</div>
                <VolunteerActivismRoundedIcon sx={{fontSize: 60, color: "#646464"}}/>
            </div>
            <div id="cost-type-other"
                 className={"d-flex flex-column w-30 px-3 py-2 add-announcement-cost-type-button align-items-center justify-content-center rounded cursor-pointer p-1 "
                     + (selectedType==="other" && "selected-cost-type")}
                 onClick={()=>handleCostTypeClick("other")}
            >
                <div>Inna</div>
                <MoreHorizOutlinedIcon sx={{fontSize: 70, color: "#646464"}}/>
            </div>
        </div>
    );
};

export default CostTypesButtons;