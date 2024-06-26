"use client"

import { useRecoilState } from "recoil";
import Tool from "./Tool";
import { ERC1155Name, ERC1155SecurityContact, ERC1155License, ERC1155Mintable, ERC1155Pauseable, ERC1155AccessControl, ERC1155Burnable, ERC1155Upgradeability, ERC1155UpgradeabilityTransparent, ERC1155UpgradeabilityUUPS, ERC1155AccessControlRoles, ERC1155AccessControlOwnable, ERC1155AccessControlManaged, ERC1155BaseURI, ERC1155SupplyTracking, ERC1155UpdateableURI } from "@/store/ERC1155";

export default function ERC1155() {

  // Settings
  const [name, setName] = useRecoilState(ERC1155Name);
  const [baseURI, setBaseURI] = useRecoilState(ERC1155BaseURI);
  // Features
  const [mintable, setMintable] = useRecoilState(ERC1155Mintable);
  const [burnable, setBurnable] = useRecoilState(ERC1155Burnable);
  const [supplyTracking, setSupplyTracking] = useRecoilState(ERC1155SupplyTracking);
  const [pauseable, setPauseable] = useRecoilState(ERC1155Pauseable);
  const [updateableURI, setUpdateableURI] = useRecoilState(ERC1155UpdateableURI);
  // AccessControl
  const [accessControl, setAccessControl] = useRecoilState(ERC1155AccessControl);
  const [ownable, setOwnable] = useRecoilState(ERC1155AccessControlOwnable);
  const [roles, setRoles] = useRecoilState(ERC1155AccessControlRoles);
  const [managed, setManaged] = useRecoilState(ERC1155AccessControlManaged);
  // Upgradeability
  const [upgradeability, setUpgradeability] = useRecoilState(ERC1155Upgradeability);
  const [transparent, setTransparent] = useRecoilState(ERC1155UpgradeabilityTransparent);
  const [UUPS, setUUPS] = useRecoilState(ERC1155UpgradeabilityUUPS);
  // Info
  const [securityContact, setSecurityContact] = useRecoilState(ERC1155SecurityContact);
  const [license, setLicense] = useRecoilState(ERC1155License);

  const handleUpgradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'transparent') {
      setTransparent(true);
      setUUPS(false);
    } else if (e.target.value === 'uups') {
      setUUPS(true);
      setTransparent(false);

      if (!accessControl) {
        setAccessControl(true);
        setOwnable(true)
      }
    }
    setUpgradeability(true); // Set the checkbox to true if either radio input is true
  };

  const handleMintableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setMintable(isChecked);

    if (isChecked) {
      if (!accessControl) {
        setAccessControl(true);
        setOwnable(true)
      }
    } else if (!pauseable && !updateableURI && !UUPS) {
      setAccessControl(false);
      setOwnable(false);
      setManaged(false);
      setRoles(false);
    }
  };

  const handlePausableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setPauseable(isChecked);

    if (isChecked) {
      if (!accessControl) {
        setAccessControl(true);
        setOwnable(true)
      }
    } else if (!mintable && !updateableURI && !UUPS) {
      setAccessControl(false);
      setOwnable(false);
      setManaged(false);
      setRoles(false);
    }
  };

  const handleUpdateableURIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUpdateableURI(isChecked);

    if (isChecked) {
      if (!accessControl) {
        setAccessControl(true);
        setOwnable(true)
      }
    } else if (!mintable && !pauseable && !UUPS) {
      setAccessControl(false);
      setOwnable(false);
      setManaged(false);
      setRoles(false);
    }
  };

  const handleAccessControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (value === 'ownable') {
      setOwnable(isChecked);
      setRoles(false);
      setManaged(false);
    } else if (value === 'roles') {
      setRoles(isChecked);
      setOwnable(false);
      setManaged(false);
    } else if (value === 'managed') {
      setRoles(false);
      setOwnable(false);
      setManaged(isChecked);
    }

    if (isChecked || mintable || pauseable || updateableURI) {
      setAccessControl(true);
    } else {
      setAccessControl(false);
    }
  };

  const handleUpgradabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (value === 'upgradeable') {

      if (isChecked) {
        setUUPS(false);
        setTransparent(true);
      } else {
        setUUPS(false);
        setTransparent(false);
      }
      setUpgradeability(!upgradeability);
    }
  };

  const handleAccessControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (!mintable && !pauseable && !updateableURI) {

      if (value === 'access') {

        if (isChecked) {
          setOwnable(true);
          setRoles(false);
          setManaged(false)
        } else {
          setOwnable(false);
          setRoles(false);
          setManaged(false)
        }
        setAccessControl(!accessControl);
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="p-4 overflow-visible">
      <div>
        <h2 className="text-white font-semibold text-xs">SETTINGS</h2>
        <div className="flex flex-col p-[0.5rem]">
          <div className="flex item-center place-content-between">
            <label htmlFor="uri" className="text-white text-[0.875rem]"> Name </label>
          </div>
          <input
            id="name"
            type="text"
            placeholder=""
            className="border border-1 border-[#333333] rounded-[6px] p-1  text-black"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col p-[0.5rem]">
          <div className="flex item-center place-content-between">
            <label htmlFor="uri" className="text-white text-[0.875rem]"> Uri </label>
            <Tool tooltipText="Location of the metadata. Clients will replace any instance of {id} in this string with the tokenId." />
          </div>
          <input
            id="uri"
            type="text"
            placeholder="https://..."
            className="border border-1 border-[#333333] rounded-[6px] p-1  text-black"
            value={baseURI} onChange={(e) => setBaseURI(e.target.value)}
          />
        </div>
      </div>

      <hr className="my-4"></hr>

      <div>
        <h1 className="text-white font-semibold text-xs">FEATURES</h1>
        <div className="mt-2">
          <label className={`flex items-center justify-between cursor-pointer ${mintable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Mintable"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={mintable}
                onChange={handleMintableChange}
              />
              <span className="ml-[0.5rem] text-white select-text">Mintable</span>
            </div>
            <Tool tooltipText="Privileged accounts will be able to create more supply." />
          </label>

          <label className={`flex items-center justify-between cursor-pointer ${burnable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Burnable"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={burnable}
                onChange={() => setBurnable(!burnable)}
              />
              <span className="ml-[0.5rem] text-white select-text">Burnable</span>
            </div>
            <Tool tooltipText="Token holders will be able to destroy their tokens." link="https://docs.openzeppelin.com/contracts/5.x/api/token/erc1155#ERC1155Burnable" linktext="Read more" />
          </label>

          <label className={`flex items-center justify-between cursor-pointer ${supplyTracking ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Supply Tracking"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={supplyTracking}
                onChange={() => setSupplyTracking(!supplyTracking)}
              />
              <span className="ml-2 text-white select-text">Supply Tracking</span>
            </div>
            <Tool tooltipText="Keeps track of total supply of tokens." />
          </label>


          <label className={`flex items-center justify-between cursor-pointer ${pauseable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Pauseable"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={pauseable}
                onChange={handlePausableChange}
              />
              <span className="ml-[0.5rem] text-white select-text">Pauseable</span>
            </div>
            <Tool tooltipText="Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response." link="https://docs.openzeppelin.com/contracts/5.x/api/utils#Pausable" linktext="Read more" />
          </label>

          <label className={`flex items-center justify-between cursor-pointer ${updateableURI ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Updateable URI"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={updateableURI}
                onChange={handleUpdateableURIChange}
              />
              <span className="ml-[0.5rem] text-white select-text">Updateable URI</span>
            </div>
            <Tool tooltipText="Privileged accounts will be able to set a new URI for all token types. Clients will replace any instance of {id} in the URI with the tokenId." link="https://docs.openzeppelin.com/contracts/5.x/api/token/erc1155#ERC1155-_setURI-string-" linktext="Read more" />
          </label>
        </div>
      </div>

      <hr className="my-4"></hr>

      <div>
        <div className=" mt-0  flex items-center place-content-between">
          <div className="flex items-center mr-[0.5rem]">
            <label className="text-white font-semibold text-xs mr-[0.5rem]">ACCESS CONTROL</label>
            <input
              type="checkbox"
              className="form-checkbox h-3 w-3 rounded"
              checked={accessControl}
              value="access"
              onChange={handleAccessControl}
            />
          </div>
          <Tool tooltipText="Restrict who can access the functions of a contract or when they can do it." link='https://docs.openzeppelin.com/contracts/5.x/api/access' linktext='Read more' />
        </div>

        <div className="mt-2">
          <label className={`flex items-center justify-between cursor-pointer ${ownable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Ownable"
                type="radio"
                className="form-radio h-3 w-3"
                value="ownable"
                checked={ownable}
                name="access"
                onChange={handleAccessControlChange}
              />
              <span className="ml-2 text-white select-text">Ownable</span>
            </div>
            <Tool tooltipText="Simple mechanism with a single account authorized for all privileged actions." link="https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable" linktext="Read more" />
          </label>

          <label className={`flex items-center justify-between cursor-pointer ${roles ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Roles"
                type="radio"
                className="form-radio h-3 w-3"
                value="roles"
                checked={roles}
                name="access"
                onChange={handleAccessControlChange}
              />
              <span className="ml-2 text-white select-text">Roles</span>
            </div>
            <Tool tooltipText="Flexible mechanism with a separate role for each privileged action. A role can have many authorized accounts." link="https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl" linktext="Read more" />
          </label>

          <label className={`flex items-center mb-0 justify-between cursor-pointer ${managed ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Managed"
                type="radio"
                className="form-radio h-3 w-3"
                value="managed"
                checked={managed}
                name="access"
                onChange={handleAccessControlChange}
              />
              <span className="ml-2 text-white select-text">Managed</span>
            </div>
            <Tool tooltipText="Enables a central contract to define a policy that allows certain callers to access certain functions." link="https://docs.openzeppelin.com/contracts/5.x/api/access#AccessManaged" linktext="Read more" />
          </label>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <div className=" mt-0  flex items-center place-content-between">
          <div className="flex items-center mr-[0.5rem]">
            <label className="text-white font-semibold text-xs mr-[0.5rem]">UPGRADABILITY</label>
            <input
              type="checkbox"
              className="form-checkbox h-3 w-3 rounded"
              checked={upgradeability}
              value="upgradeable"
              onChange={handleUpgradabilityChange}
            />
          </div>
          <Tool tooltipText="Restrict who can access the functions of a contract or when they can do it." link='https://docs.openzeppelin.com/contracts/5.x/api/access' linktext='Read more' />
        </div>


        <div className="mt-2">
          <label className={`flex items-center justify-between cursor-pointer ${transparent ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="transparent"
                type="radio"
                className="form-radio h-3 w-3"
                value='transparent'
                checked={transparent}
                onChange={handleUpgradeChange}
              />
              <span className="ml-2 text-white select-text">Transparent</span>
            </div>
            <Tool tooltipText="Uses more complex proxy with higher overhead, requires less changes in your contract. Can also be used with beacons." link="https://docs.openzeppelin.com/contracts/5.x/api/proxy#TransparentUpgradeableProxy" linktext="Read more" />
          </label>


          <label className={`mb-0 flex items-center justify-between cursor-pointer ${UUPS ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="uups"
                type="radio"
                className="radio h-3 w-3"
                value="uups"
                checked={UUPS}
                onChange={handleUpgradeChange}
              />
              <span className="ml-2 text-white select-text">UUPS</span>
            </div>
            <Tool tooltipText="Uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorizing upgrades." link="https://docs.openzeppelin.com/contracts/5.x/api/proxy#UUPSUpgradeable" linktext="Read more" />
          </label>
        </div>
      </div>

      <hr className="my-4" />

      <div className="px-2">
        <h1 className="text-white font-semibold text-xs ">INFO</h1>
        <div className="flex flex-col mt-[0.75rem]">
          <div className="flex items-center justify-between">
            <label htmlFor="Security Contact" className="text-white text-sm">  Security Contact </label>
            <Tool tooltipText="Where people can contact you to report security issues. Will only be visible if contract metadata is verified." link='https://github.com/ethereum-lists/contracts/blob/main/README.md#tracking-new-deployments' linktext='Read more' />
          </div>
          <input
            id="Security Contact"
            type="text"
            placeholder="security@example.com"
            className="border border-1 border-[#333333] rounded-[6px] p-1  text-black"
            value={securityContact}
            onChange={(e) => setSecurityContact(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-[0.75rem]">
          <label htmlFor="license" className="text-white text-sm"> License </label>
          <input
            id="license"
            type="text"
            placeholder="MIT"
            className="border border-1 border-[#333333] rounded-[6px] p-1  text-black"
            value={license} onChange={(e) => setLicense(e.target.value)}
          />
        </div>
      </div>
    </div>

  );
}
