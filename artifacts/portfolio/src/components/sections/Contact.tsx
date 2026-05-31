import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SOCIAL_LINKS } from "../../lib/links";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = encodeURIComponent(`Portfolio Contact from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
    window.open(`${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`, "_blank");
    form.reset();
  }

  const socialLinks = [
    { href: SOCIAL_LINKS.github, icon: <Github size={20} />, label: "GitHub" },
    { href: SOCIAL_LINKS.linkedin, icon: <Linkedin size={20} />, label: "LinkedIn" },
    { href: SOCIAL_LINKS.twitter, icon: <Twitter size={20} />, label: "Twitter" },
    { href: SOCIAL_LINKS.instagram, icon: <Instagram size={20} />, label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden glass-section">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 blur-[100px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">Get In Touch</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none">
              Let's Build <br /> Something <span className="text-primary">Insane</span>.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Ready to push boundaries? Drop me a line and let's start a conversation about your next big project.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                  <a
                    href={SOCIAL_LINKS.email}
                    data-testid="link-contact-email"
                    className="text-lg font-bold hover:text-primary transition-colors"
                  >
                    lukmanugrahaaa@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</div>
                  <div className="text-lg font-bold">San Francisco, CA</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  data-testid={`link-contact-${link.label.toLowerCase()}`}
                  className="w-11 h-11 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 md:p-12"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          data-testid="input-contact-name"
                          {...field}
                          className="bg-background border-border rounded-none h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          data-testid="input-contact-email"
                          {...field}
                          className="bg-background border-border rounded-none h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          data-testid="input-contact-message"
                          className="bg-background border-border rounded-none min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  data-testid="button-contact-submit"
                  className="w-full h-14 rounded-none bg-primary text-primary-foreground font-black uppercase tracking-widest hover:bg-primary/90 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
