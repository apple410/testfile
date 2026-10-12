
import { mongoConnect } from "@/lib/mongodbConnect";
import { taskmodel } from "@/models/taskmodel";
import React from "react";





export default async function Display() {

    await mongoConnect();

    const data = await taskmodel.find().lean();


  return (
    <section className="h-150 w-150 bg-red-400 m-auto">
      <h2 className="text-4xl text-center">Task</h2>
      <div>
        {data.map((datum) => (
          <div
            key={datum._id.toString()}
            className="bg-white p-3 rounded text-black shadow"
          >
            <h3 className="font-bold text-lg">{datum.title}</h3>
            <p>{datum.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
