const STAGES: { label: string; key: "base" | "sft" | "dpo" }[] = [
  { label: "Base (pretrain only)", key: "base" },
  { label: "SFT", key: "sft" },
  { label: "DPO", key: "dpo" },
];

const EXAMPLES: { question: string; base: string; sft: string; dpo: string }[] = [
  {
    question: "Who is Harry Potter?",
    base: "“Fugitive — ” “That was Lucius Malfoy!” said Harry as they passed in front of a huge black dungeon. “You know what Dumbledore said to Snape that night?” “He warned Snape not to do it!” said Harry. For a time Snape seemed to have forgotten the letter he used to write to Dumbledore the previous night. But he had forgotten the rest of his letter, apparently because it still clattered off a table and was hanging like a heavy sack in the front of his bedroom. “Malfoy didn’t",
    sft: "Umbridge: Umbridge is the head of the Ministry's “secret” school and her role is to train kids to be good at magic and not to be arrogant. She is the most dangerous witch in the school and she is definitely the most dangerous in the series. I missed that she is the one who “saved” Harry from the Horcrux while she was teaching her children. Do you think she was right to act so kindly toward Harry during that time?",
    dpo: "I’ve never met him, but he’s definitely the one I want to hang out with. I didn’t realize how much he changes my life as a kid until a book later. Do you think he ever looked back at how you felt about him at that point?",
  },
  {
    question: "What is the Mirror of Erised?",
    base: "“Your old friend, Harry Potter,” said Seamus Belladonna, as the Gryffindors stood and stared intently into the darkness as the four of them passed the entrance to the Room of Requirement, which was surrounded by a large table full of glasses filled with glasses of various color, and crowded with people who seemed to be familiar with Harry Potter’s school. “Well, you know, this room is quite large, and I’ve been waiting for you here a long time,” said Mr. Belladonna, and he sat down next to Harry.",
    sft: "The Mirror of Erised is the most ancient and dangerous secret in the wizarding world—it is the only one that does not require the use of a wand. Dumbledore's version of it is that Erised is the key to the Chamber of Secrets—it cannot be destroyed, but only the key to the Chamber itself. I noticed that in the later books Dumbledore explains it as a “strange coincidence,” which is basically what Harry hears. Do you think Dumbledore was right?",
    dpo: "Umbridge says it’s the only one she’s ever really seen. It’s basically a mirror of the Prophet’s memory, which makes it even scarier when you think about it. Does it feel like her calling it that much more than anything? Do you think it’s her best chance to make a statement?",
  },
  {
    question: "Why did Voldemort fail to kill Harry as a baby?",
    base: "Dumbledore said that he had never given permission for the Death Eaters to kill him.” “You’ve said it before. Dumbledore wasn’t at all surprised that you seem to have managed to kill him. Why did Voldemort choose to do it?” “Because he’d done it because Voldemort wished to,” said Dumbledore. “You’re talking about his wanting to kill you,” said Luna and Harry. “No, Dumbledore was not surprised that Voldemort had chosen to kill Harry. He was merely pleased that you’d done it under the hope that you would",
    sft: "Umbridge was the only one who actually said it was Voldemort's fault. I only noticed on re-read how the Horcrux prophecy basically tells Harry to “kill himself” in Deathly Hallows. Did the prophecy change your opinion of him or just you feeling bad for him?",
    dpo: "Because he’s the one who actually killed Harry in the forest. He’s the one who gave Harry the wand and then sent it back to the man who sent it. The way he’s shown to be genuinely brave during the battle is such a contrast to what he’s shown as the man he should be. I noticed on a reread that Harry’s whole “I fought a good man” speech is about survival instead of “I died alone” or even “I was raised by a murderer.” Do you think that’s why Harry chose to stay with Voldemort?",
  },
  {
    question: "Is Dumbledore a good person?",
    base: "Yes. ‘You must not be, sir,” said Mr. Weasley.” “Well, if he likes you, then — ” he added, and the old whisper was no longer audible. “Very well,” said Mr. Weasley, a small smile on his face. “You should tell me your opinion of Dumbledore and not just give them an inch of your soul.” “What?” said Mr. Weasley, looking at Dumbledore, but he did not reply. The oldwhisper shook his head. He looked around at Harry, who was",
    sft: "Dumbledore is a very loyal, kind, and kind man who loves his family and respects those who disagree. He is also a master of hiding his own identity, which is why he chooses to leave Harry in Azkaban. I didn't realize until a reread that his deathbed is the only one in the castle that does not contain a Horcrux. Do you think Dumbledore is a good person?",
    dpo: "He is genuinely kind, especially when it comes to people like Harry. It’s interesting that he is a total jerk to people he disagrees with like Quirrell and Hermione, but at the same time, he is also the man who was willing to protect Harry. Do you think he would have been a better teacher if he’d grown up with Ron instead of just watching him with a stack of cards?",
  },
  {
    question: "Does Snape try to save Harry Potter?",
    base: "” “Yes,” said Harry. “He said he’d like me to tell you what it actually means when he tries to save him.” “Yeah,” said Ron. “But I’ve already told you, Professor Snape, if you want to know what it means, ’cause you’re not here.” “Well,” said Harry, “If you want to know what it means, I weren’t supposed to tell you. But now I know what it means to save somebody.” Ron�",
    sft: "That question is the heart of the series. It’s the only time he actually explains what happens to him. He’s shown to be arrogant, calculating, and arrogant enough to trust Harry he’s not. It’s the perfect excuse for why he couldn't save Harry when it’s convenient. Does that make you more or less uncomfortable with him?",
    dpo: "He does, and he does it in a way that genuinely shocks Harry and makes him feel guilty about everything he's done. He gives Harry an apology for his “brains” and the way he killed Sirius in the forest, but he also says he didn't tell Harry he was a murderer. Does that make him more or less likable to you?",
  },
  {
    question: "Why didn't they just use Veritaserum on Sirius to prove he was innocent?",
    base: "” “Was there a way to prove you’re innocent?” asked Hermione, glancing at Severus. “It was easy, wasn’t it?” “I haven’t done it,” said Snape. “I didn’t think I knew what I was doing when I saw the diary. I was really surprised I didn’t know everything I’d been told. I thought I was just stupid!” “But what if Snape was saying that the Aurors could not prove you were innocent, and I told him you had to prove",
    sft: "Umbridge said Veritaserum is “the only reliable way to stop the Dark Arts from spreading,” but it does not guarantee Harry is innocent. He is basically relying on a memory charm to hold the Horcrux in place, which is why it is the only reliable method. I missed that Veritaserum is a very rare and expensive substance, which is why it is dangerous to buy. Do you think that was the only way to prove Sirius was innocent?",
    dpo: "That whole “if you were me I could see you hiding something” thing is one of those “if you were alive and I was watching” moments. I didn't realize until later that the Ministry is actually really strict when it comes to protecting people who break the law. I didn't realize until later that they actually didn't even try to track down anyone who might have been using the spell, even if they wanted to. Do you think they knew enough to act?",
  },
  {
    question: "I just finished Prisoner of Azkaban and I am destroyed about Sirius",
    base: "— ” Harry knew that there was really no point in being here because Sirius was still suddenly starting to look very sick and upset. The only thing that could help Harry now was watching The Prince’s Headmaster’s dance with a nervous expression on his face. “Well, I might’ve asked you if I thought this was a good idea to let him join you in the hospital wing?” “Yes, sir,” said Harry. “I had the same reaction when the Dark Lord came down there. ...” “Well,” said Professor",
    sft: "Sirius is one of the most fascinating characters in the series and it is his only real choice. And I cannot argue that the “separate but equal” policy at the Ministry was a mistake. Do you think it was a mistake or just a lot of people choosing to ignore him?",
    dpo: "He’s the one who saves the day and then he goes to his grave the next day, and I love that he is not the only one who sees Sirius's face. I love that he is the one who finally explains to Voldemort why he killed him, not because he wished he could, but because he wants to say “Yes” to Sirius. Do you think Sirius would have done the same if he’d just stayed at Hogwarts?",
  },
  {
    question: "I have a theory that Dumbledore is actually Death from the Three Brothers tale",
    base: "of Voldemort.” Malfoy turned and walked over to Ron. “What — Harry?” said Hermione. “Dumbledore has told me that you have been the victim of an extraordinary plot to kill him,” said Dumbledore. “For your part, I do not believe that you have been the one who’s been wondering about this,” “I do not believe it.” “But — well, I might be mistaken if I put it differently,” said Dumbledore, raising his voice so loudly that Ron, too, wanted",
    sft: "That would be his “death” scene in Goblet of Fire, which is the ultimate proof that Dumbledore was a real person. I caught that the “bloody” part of his eyes actually shows up in the final battle. Do you think it was his “blood” that won him the war?",
    dpo: "It’s not even real — the way he’s described is basically his “wand-army” and his inability to keep his cool in the Deathly Hallows. And the way he “hands” Harry his sword and tells him to “destroy the Horcrux” only makes the book feel more like an excuse for him to be a coward. But the whole book is kind of bleak for that — his “death” basically involves the “destruction of a loved one.” Do you think the “end of the world” storyline is the best one for him?",
  },
];

export function StageComparison() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {EXAMPLES.map((ex, i) => (
        <details
          key={ex.question}
          open={i === 0}
          style={{ border: "1px solid var(--line)", borderRadius: 10, background: "var(--panel)", padding: "12px 16px" }}
        >
          <summary style={{ fontFamily: "var(--sans)", fontSize: 14.5, fontWeight: 600, color: "var(--ink)", cursor: "pointer" }}>
            {ex.question}
          </summary>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
            {STAGES.map((s) => (
              <div key={s.key}>
                <span className="chip" style={{ marginBottom: 6, display: "inline-block" }}>{s.label}</span>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink)", margin: 0 }}>{ex[s.key]}</p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
