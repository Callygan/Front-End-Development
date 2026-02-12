import { ControlledForm } from "./components/ControlledForm/ControlledForm";
import { UncontrolledForm } from "./components/UncontrolledForm/UncontrolledForm";

export default function App() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 text-white">
            <div className="flex flex-around gap-8 ">
                <section className="p-12 bg-gray-600 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Uncontrolled Components</h2>
                    <UncontrolledForm />
                </section>
                    <section className="p-12 bg-gray-600 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Controlled Components</h2>
                <ControlledForm />
                </section>
            </div>
        </main>
    )
}