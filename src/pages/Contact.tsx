import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const teamEmails = [
    {
      name: t("salesTeam"),
      email: t("salesEmail"),
      description: t("productInquiriesOrders")
    },
    {
      name: t("supportTeam"),
      email: t("supportEmail"),
      description: t("technicalSupportAssistance")
    },
    {
      name: t("management"),
      email: t("adminEmail"),
      description: t("generalInquiriesPartnerships")
    },
    {
      name: t("returnsExchanges"),
      email: t("returnsEmail"),
      description: t("productReturnsExchanges")
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success(t("messageSentSuccessfully"));
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <BackButton />
          <h1 className="text-4xl font-bold text-dark mt-4 mb-2">{t("contactUs")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("getInTouchContact")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t("sendUsMessage")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("fullName")}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("yourFullName")}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("emailAddress")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("yourEmailExample")}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">{t("subject")}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t("whatIsThisRegarding")}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">{t("message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("tellUsHowWeCanHelp")}
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {t("sendMessage")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Team Emails */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t("getInTouchTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">{t("email")}</p>
                    <p className="text-muted-foreground">{t("infoEmail")}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">{t("phone")}</p>
                    <p className="text-muted-foreground">{t("phoneNumber")}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">{t("address")}</p>
                    <p className="text-muted-foreground">
                      {t("businessAddress")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Emails */}
            <Card>
              <CardHeader>
                <CardTitle>{t("teamContact")}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {t("reachOutToSpecific")}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamEmails.map((contact, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-muted/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-dark">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {contact.description}
                          </p>
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-gold hover:text-gold/80 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                          >
                            <Mail className="h-4 w-4" />
                            {contact.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle>{t("businessHours")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("mondayFriday")}</span>
                    <span className="text-muted-foreground">{t("nineSix")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("saturday")}</span>
                    <span className="text-muted-foreground">{t("tenFour")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("sunday")}</span>
                    <span className="text-muted-foreground">{t("closed")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;