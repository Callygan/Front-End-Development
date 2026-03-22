import { useState } from 'react'
import { Button } from './components/Button/Button'
import { Link } from './components/Link/Link'
import { Input } from './components/Input/Input'
import { SelectMenu } from './components/SelectMenu/SelectMenu'
import { Dropdown } from './components/Dropdown/Dropdown'
import { ColorPicker } from './components/ColorPicker/ColorPicker'
import { Modal } from './components/Modal/Modal'
import { DatePicker } from './components/DatePicker/DatePicker'
import { Toast } from './components/Toast/Toast'


function App() {
  const [time, setTime] = useState('12:30 pm')
  const [dropdownValue, setDropdownValue] = useState('Week')
  const [color, setColor] = useState('#FF0000')
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-wrap gap-6 p-8">
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
      <div className="flex flex-col gap-4">
        <Link href="#">Link</Link>
        <Link disabled href="#">Link</Link>
      </div>

      <div className="flex gap-4">
        <Input label="Username*" placeholder="Enter your username" />
        <Input label="Password*" type="password" placeholder="Enter your password" />
        <Input label="Username*" value="QuantumSphinx23" error="Error message" onChange={() => {}} />
        <Input label="Username*" disabled value="QuantumSphinx23" onChange={() => {}} />
      </div>

      <div className="p-8 flex gap-4">
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

      <div className="p-8 flex gap-4">
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

      <div className="p-8 flex gap-4">
        <ColorPicker
          label="Colour"
          selectedColor={color}
          onChange={setColor}
          colors={['#FF0000', '#FF6B00', '#FFD700', '#00CC00', '#0000FF', '#8B00FF', '#FF69B4', '#000000', '#FFFFFF']}
        />
      </div>

      <div className="p-8 flex gap-4">
        <button onClick={() => setIsOpen(true)}>Deschide Modal</button>
        <Modal title="Title" isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. LoremLorem ipsum dolor sit amet consectetur adipiscing elit. LoremLorem ipsum dolor sit amet consectetur adipiscing elit. Lorem </p>
        </Modal>
      </div>

      <div className="p-8">
        <DatePicker value={date} onChange={setDate} />
        {date && <p className="mt-4 text-sm">Selected: {date.toLocaleDateString()}</p>}
      </div>

      <div className="p-8">
            <button onClick={() => setShow(true)}>Delete Event</button>
            {show && <Toast message="Event deleted" onClose={() => setShow(false)} />}
      </div>
    </div>
  )
}

export default App