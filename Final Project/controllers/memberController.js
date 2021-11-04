const chalk = require("chalk");

const memberService = require("../services/memberService");

exports.getAllMembers = (req, res) => {
  const membersFound = memberService.getAllMembers();
  res.status(200).send(membersFound);
};

exports.getMember = (req, res) => {
  const { id } = req.params;
  const memberFound = memberService.getMember(id);

  if (!!memberFound.length) {
    res.status(200).send(memberFound);
  } else {
    console.log(chalk.redBright.bold(`Member ${id} not found.!`));
    res.status(404).send("Member not Found.");
  }
};

exports.getMemberBy = (req, res) => {
  const { name, status } = req.query;
  const membersFound = memberService.getMemberBy({ name, status });

  res.status(200).send(membersFound);
}

exports.addMember = (req, res) => {
  const memberData = req.body;
  memberService.addMember(memberData);

  res.status(201).send(`Member successfully created`);
}

exports.updateMember = (req, res) => {
  const memberData = req.body;
  memberService.updateMember(memberData);
  
  res.status(200).send(`Member successfully updated`);
}

exports.deleteMember = (req, res) => {
  const { id } = req.body;
  memberService.deleteMember(id);

  res.status(200).send(`Member successfully deleted`);
};
