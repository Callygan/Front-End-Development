import { useState } from 'react'
import { Button } from './components/Button/Button'
import { Link } from './components/Link/Link'
import { Input } from './components/Input/Input'
import { Checkbox } from './components/Checkbox/Checkbox'
import { SelectMenu } from './components/SelectMenu/SelectMenu'
import { TextArea } from './components/TextArea/TextArea'
import { Dropdown } from './components/Dropdown/Dropdown'
import { ColorPicker } from './components/ColorPicker/ColorPicker'
import { Modal } from './components/Modal/Modal'
import { DatePicker } from './components/DatePicker/DatePicker'
import { Toast } from './components/Toast/Toast'
import { Icon } from './components/Icons/Icons'
import type { IconName } from './components/Icons/Icons.type'


function App() {
  const [time, setTime] = useState('12:30 pm')
  const [dropdownValue, setDropdownValue] = useState('Week')
  const [color, setColor] = useState('#FF0000')
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [show, setShow] = useState(false)
  const allIcons: IconName[] = ['arrowDown', 'arrowLeft', 'arrowRight', 'checked', 'close', 'delete', 'edit', 'eyeLine', 'eyeClose', 'google', 'playBlack', 'playWhite', 'checkboxFill', 'checkboxLine', 'colorSelected', 'color']

  return (
    <div className="flex flex-wrap items-start gap-12 p-12">
      {/* Buttons */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <Button>Button</Button>
          <Button disabled>Button</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button icon>Button</Button>
          <Button icon disabled>Button</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="secondary">Button</Button>
          <Button variant="secondary" disabled>Button</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="secondary" icon>Button</Button>
          <Button variant="secondary" icon disabled>Button</Button>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-6">
        <Link href="#">Link</Link>
        <Link disabled href="#">Link</Link>
      </div>

      {/* Inputs */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          <Input label="Username*" placeholder="Enter your username" />
          <Input label="Username*" disabled value="QuantumSphinx23" onChange={() => {}} />
          <Input label="Username*" value="QuantumSphinx23" error="Error message" onChange={() => {}} />
        </div>
        <div className="flex flex-col gap-4">
          <Input label="Password*" type="password" placeholder="Enter your password" />
          <Input label="Password*" disabled value="QuantumSphinx23" onChange={() => {}} />
          <Input label="Password*" type="password" value="QuantumSphinx23" error="Error message" onChange={() => {}} />
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex gap-8">
        <Checkbox checked />
        <Checkbox />
      </div>

      {/* Checkbox with Label*/}
      <div className="flex flex-col gap-6">
        <Checkbox checked label="Text" />
        <Checkbox label="Text" />
      </div>

      {/* Icons */}
      <div className="flex flex-col gap-2">
          <div className="flex flex-wrap w-64 gap-4 border border-gray-200 rounded-lg p-4">
              {allIcons.map((name) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                      <Icon name={name} size={16} />
                  </div>
              ))}
          </div>
      </div>

      {/* Modal */}
      <div className="flex items-start">
        <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-white text-gray-700 border border-gray-300 hover:bg-[#DEDFE5]" onClick={() => setIsOpen(true)}>Open Modal </button>
        <Modal title="Title" isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. LoremLorem ipsum dolor sit amet consectetur adipiscing elit. LoremLorem ipsum dolor sit amet consectetur adipiscing elit. Lorem </p>
        </Modal>
      </div>

      {/* Select Menu */}
      <div>
        <SelectMenu
          label="Time"
          selectedValue={time}
          onChange={setTime}
          options={[
            { value: '12:00 pm', label: '12:00 pm' },
            { value: '12:15 pm', label: '12:15 pm' },
            { value: '12:30 pm', label: '12:30 pm' },
            { value: '12:45 pm', label: '12:45 pm' },
            { value: '13:00 pm', label: '13:00 pm' },
          ]}
        />
      </div>

      {/* Text Area */}
      <div>
        <TextArea label="Description" placeholder="Enter your description" />
      </div>

      {/* Date Picker */}
      <div>
        <DatePicker value={date} onChange={setDate} />
        {date && <p className="mt-4 text-sm">Selected: {date.toLocaleDateString()}</p>}
      </div>
      
      {/* Dropdown */}
      <div>
        <Dropdown
          label=""
          selectedValue={dropdownValue}
          onChange={setDropdownValue}
          options={[
            {value: 'Day', label: 'Day'},
            {value: 'Week', label: 'Week'},
          ]}
        />
      </div>
      
      {/* Color Picker */}
      <div>
        <ColorPicker
          label="Colour"
          selectedColor={color}
          onChange={setColor}
          colors={[ '#9F2957', '#D90056', '#E25D33', '#DFC45A', '#B8C42F', '#16AF6E', '#429488', '#397E49', '#439BDF', '#4254AF', '#6C7AC4', '#8332A4' ]}
        />
      </div>

      {/* Toast */}
      <div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-white text-gray-700 border border-gray-300 hover:bg-[#DEDFE5]" onClick={() => setShow(true)}>Delete Event</button>
            {show && <Toast message="Event deleted" onClose={() => setShow(false)} />}
      </div>
    </div>
  )
}

export default App