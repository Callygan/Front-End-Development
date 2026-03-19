import { useState } from 'react'
import { Button } from './components/Button/Button'
import { Input } from './components/Input/Input'
import { SelectMenu } from './components/SelectMenu/SelectMenu'
import { Dropdown } from './components/Dropdown/Dropdown'

function App() {
  const [time, setTime] = useState('12:30 pm')
  const [dropdownValue, setDropdownValue] = useState('Week')

  return (
    <div>
      <div className="p-8 flex gap-4">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button disabled>Button</Button>
      </div>


      <div className="p-8 flex gap-4">
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
    </div>
  )
}

export default App