import Email from "@/components/templates/Email";
import Sms from "@/components/templates/Sms";
import TemplateOptions from "@/components/templates/TemplateOptions";
import React, { useState } from "react";

const Templates = () => {
  const [selectTemplate, setSelectedTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState({
    template_name: "",
    subject: "",
    body: "",
    channel: "email",
  });

  const [smsTemplate, setSmsTemplate] = useState({
    template_name: "",
    body: "",
    channel: "sms",
    loading: false,
  });

  return (
    <div className="pt-12 px-2">
      {!selectTemplate && (
        <TemplateOptions setSelectedTemplate={setSelectedTemplate} />
      )}
      {selectTemplate === "inapp" && (
        <Email
          setSelectedTemplate={setSelectedTemplate}
          loading={loading}
          setLoading={setLoading}
          template={template}
          setTemplate={setTemplate}
        />
      )}

      {selectTemplate === "email" && (
        <Email
          setSelectedTemplate={setSelectedTemplate}
          loading={loading}
          setLoading={setLoading}
          template={template}
          setTemplate={setTemplate}
        />
      )}

      {selectTemplate === "sms" && (
        <Sms
          setSmsTemplate={setSmsTemplate}
          smsTemplate={smsTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
    </div>
  );
};

export default Templates;
