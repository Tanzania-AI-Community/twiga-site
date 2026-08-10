import { Callout, GuideHeading, Step, Steps } from "@/components/guide/content";

export default function AddingAToolPage() {
  return (
    <>
      <GuideHeading
        eyebrow="How Twiga Works"
        title="Adding a Tool"
        description="Tools are how the model does things it cannot do by writing text. Adding one is mostly registration."
      />

      <p>Twiga ships with five:</p>
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>search_knowledge</code>
            </td>
            <td>Retrieves passages from the teacher&apos;s textbooks.</td>
          </tr>
          <tr>
            <td>
              <code>create_lesson_plan</code>
            </td>
            <td>Builds a structured lesson plan.</td>
          </tr>
          <tr>
            <td>
              <code>generate_exercise</code>
            </td>
            <td>Produces practice questions.</td>
          </tr>
          <tr>
            <td>
              <code>solve_equation</code>
            </td>
            <td>Works through mathematics, on its own model configuration.</td>
          </tr>
          <tr>
            <td>
              <code>generate_necta_style_exam</code>
            </td>
            <td>Produces an exam in the national format, delivered as a PDF.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="the-steps">The steps</h2>
      <Steps>
        <Step title="Write the function">
          Create <code>app/tools/tool_code/your_tool/main.py</code> with an{" "}
          <code>__init__.py</code> beside it. Export one async function named
          after the tool. Return a string, which is what the model sees as the
          result.
        </Step>
        <Step title="Register the name">
          Add a member to the <code>ToolName</code> enum in{" "}
          <code>app/tools/registry.py</code>. The member name and its string
          value must match.
        </Step>
        <Step title="Map the name to the function">
          Import your function and add it to <code>TOOL_FUNCTION_MAP</code> in
          the same file.
        </Step>
        <Step title="Describe it to the model">
          Append a JSON schema entry to <code>TOOLS_METADATA</code>. This is
          what the model reads to decide whether to call your tool, so the
          description is doing real work. Be specific about when it applies.
        </Step>
        <Step title="Add a holding message">
          Add <code>tools.your_tool.notification</code> to{" "}
          <code>app/assets/strings/english.yml</code>. While the tool runs, the
          teacher gets this message so the wait does not look like a hang. If
          the key is missing, nothing is sent and a warning is logged.
        </Step>
      </Steps>

      <h2 id="arguments-the-model-should-not-choose">Arguments the model should not choose</h2>
      <p>
        Some arguments come from the server, not the conversation. A user ID is
        the obvious case: you never want the model deciding whose data to read.
      </p>
      <p>
        Add a builder to <code>app/tools/internal_args.py</code> and it will be
        merged in after the model&apos;s arguments and before the call. Keep
        those parameters out of the JSON schema entirely.
      </p>

      <h3 id="class-ids-are-special">Class IDs are special</h3>
      <p>
        If your tool works on one of the teacher&apos;s classes, name the
        parameter <code>class_id</code> and copy the shape used by the existing
        tools. The registry rewrites that property per request, injecting the
        real class IDs for that teacher as an enum. The model then cannot ask
        for a class the teacher does not teach.
      </p>

      <h2 id="optional-extras">Optional extras</h2>
      <table>
        <thead>
          <tr>
            <th>If your tool needs</th>
            <th>Do this</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A different model or provider</td>
            <td>
              Add an entry to <code>ToolSettings</code> in{" "}
              <code>app/config.py</code> and a matching block under{" "}
              <code>tools:</code> in <code>app/assets/config/base.yml</code>.
              Follow <code>solve_equation</code>.
            </td>
          </tr>
          <tr>
            <td>Its own prompt</td>
            <td>
              Add files under <code>app/assets/prompts/your_prompt/</code> and
              register the version in{" "}
              <code>app/assets/config/prompts.yml</code>.
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning" title="A declared prompt with no file crashes at import">
        The prompt manager reads its registry when the module loads, so a
        version listed in <code>prompts.yml</code> without a matching file stops
        the whole application from starting. It is a fast failure, but the
        traceback points at import machinery rather than at your typo.
      </Callout>

      <h2 id="before-you-open-the-pull-request">Before you open the pull request</h2>
      <ul>
        <li>
          Tools are awaited one after another, and the teacher is waiting on
          WhatsApp. Keep them quick, and prefer a partial answer over a long
          silence.
        </li>
        <li>
          Never put a tool name in text the model might repeat. Any reply
          containing a registered tool name is thrown away and replaced with a
          generic error.
        </li>
        <li>
          Add a test under <code>tests/tools/</code>. The existing ones show the
          pattern.
        </li>
      </ul>
    </>
  );
}
