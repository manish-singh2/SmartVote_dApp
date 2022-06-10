// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;

    uint public candidatesCount;

    event votedEvent(
        uint indexed candidateId
    );


    constructor () {
        addCandidate("Narendra Modi");
        addCandidate("Rahul Gandhi");
        addCandidate("Sharad Pawar");
        addCandidate("Uddhav Thackeray");
    }


    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }


    function vote(uint _candidateId) public {
        require(voters[msg.sender] == false);
        require(_candidateId <= candidatesCount && _candidateId > 0);
        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;
        emit votedEvent(_candidateId);
    }

}
