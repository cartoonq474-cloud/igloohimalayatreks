const fs = require('fs');

let content = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');

// Target the area after the WhatsApp button up to <!-- Inquiry Modal -->
const targetRegex = /<!-- Phone & WhatsApp Round Buttons -->[\s\S]*?<!-- Inquiry Modal -->/;

const replacement = `<!-- Phone & WhatsApp Round Buttons -->
                <div style="display: flex; align-items: center; gap: 10px;">
                  <!-- Phone Call Button -->
                  <a href="tel:+9779800000000" aria-label="Call Us" style="width: 44px; height: 44px; border-radius: 50%; border: 1px solid #CBD5E1; background: #FFFFFF; display: flex; align-items: center; justify-content: center; color: #0E3458; text-decoration: none; transition: all 0.2s;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </a>

                  <!-- WhatsApp Button -->
                  <a href="https://wa.me/9779800000000" target="_blank" rel="noopener" aria-label="WhatsApp Us" style="width: 44px; height: 44px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; color: #FFFFFF; text-decoration: none; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3); transition: all 0.2s;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.333 4.988l-1.417 5.176 5.297-1.389c1.458.796 3.103 1.215 4.773 1.216h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.669-1.039-5.176-2.926-7.063a9.923 9.923 0 0 0-7.063-2.927zm0 1.666c4.587 0 8.324 3.737 8.324 8.324 0 2.224-.866 4.314-2.441 5.889a8.272 8.272 0 0 1-5.888 2.438h-.003c-1.493 0-2.955-.399-4.232-1.156l-.304-.18-3.14.823.837-3.058-.198-.315a8.283 8.283 0 0 1-1.272-4.444c.001-4.587 3.739-8.324 8.326-8.324zm-3.626 4.321c-.227 0-.594.085-.905.424-.311.339-1.187 1.159-1.187 2.825 0 1.666 1.216 3.277 1.385 3.503.17.226 2.392 3.652 5.795 5.122.81.35 1.442.559 1.936.716.814.258 1.554.222 2.139.135.652-.097 2.007-.82 2.29-1.611.283-.791.283-1.469.198-1.611-.085-.141-.311-.226-.65-.396s-2.007-.99-2.318-1.103c-.311-.113-.538-.17-.764.17s-.877 1.103-1.075 1.329c-.198.226-.396.254-.735.085-.339-.17-1.433-.528-2.73-1.685-1.01-.901-1.691-2.013-1.89-2.352-.198-.339-.021-.522.148-.691.153-.153.339-.396.509-.594.17-.198.226-.339.339-.565.113-.226.057-.424-.028-.594-.085-.17-.764-1.838-1.047-2.516-.275-.661-.555-.572-.764-.582-.198-.01-.424-.012-.651-.012z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div> <!-- Closes .sidebar-booking-card -->
          </div> <!-- Closes right column wrapper -->

        </div> <!-- Closes .container.trek-detail-layout -->
      </div>
    </section>

  <!-- Inquiry Modal -->`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('trek/upper-mustang-trek/index.html', content, 'utf8');
  console.log('✓ Successfully fixed sidebar closing structure');
} else {
  console.error('✗ Failed to match targetRegex');
}
