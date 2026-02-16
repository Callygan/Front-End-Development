import { ControlledForm } from "./components/ControlledForm/ControlledForm";
import { UncontrolledForm } from "./components/UncontrolledForm/UncontrolledForm";

export default function App() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 text-white bg-black">
            <div className="flex justify-around max-w-5xl w-full gap-4">
                <section className="flex flex-col justify-center items-center gap-4">
                    <h2 className="text-3xl font-semibold mb-2">Uncontrolled Components</h2>
                    <UncontrolledForm />
                </section>
                    <section className="flex flex-col justify-center items-center gap-4">
                    <h2 className="text-3xl font-semibold mb-2">Controlled Components</h2>
                <ControlledForm />
                </section>
            </div>
        </main>
    )
}