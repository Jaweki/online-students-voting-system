export const initalNewBallotInputState = {
    title: "",
    desc: "",
    tags: "",
    time_span: {
      from: "",
      to: "",
    },
    type: {
      binary: true,
      candidate: [{ userId: "", slogan: "", desc: "" }],
    },
  }